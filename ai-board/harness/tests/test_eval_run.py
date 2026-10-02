"""Seam duy nhất của eval runner: eval_run.main(argv, deps) chạy trọn vẹn với model giả trong thư mục tạm, seed cố định.
Không test riêng bộ sinh hay thống kê: chỉ soi báo cáo và file run ghi ra."""
import dataclasses
import itertools
import json
import re

import pytest

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
    die_after: int | None = None  # giả lập bị kill: KeyboardInterrupt sau chừng này lời gọi

    def generate(self, model, prompt, **kw):
        if self.die_after is not None and len(self.calls) >= self.die_after:
            raise KeyboardInterrupt
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
    return eval_run.main(["quick", "--seed", str(seed), "--cases", "4", "--repeats", "1", "--root", str(tmp_path), *extra], deps)


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
    saved = run_text(tmp_path)
    assert saved.strip() in printed
    modes = []
    for case, line in zip(corpus, report(tmp_path)["cases"]):
        mode = sum(map(ord, case["gold"]["new"])) % 4
        modes.append(mode)
        assert line["id"] == case["id"] and line["kind"] == case["kind"]
        assert line["passed"] == (mode < 2) and line["reached"] == {"gate3": 1, "gold_oracle": int(mode != 3)}
        (text_line,) = [row for row in saved.splitlines() if row.startswith(case["id"])]
        assert f"đạt {int(mode < 2)}/1" in text_line
    assert sorted(modes) == [0, 1, 2, 3]  # seed 12 có đủ: đạt, đạt, oracle hỏng, cổng 3 chặn


def results(root, seed=12):
    path = root / "runs" / f"quick-s{seed}" / "results.jsonl"
    rows = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines()]
    return [{k: v for k, v in row.items() if k != "wall_s"} for row in rows]  # wall_s = đồng hồ thật


def run_text(root, seed=12):
    return (root / "runs" / f"quick-s{seed}" / "report.txt").read_text(encoding="utf-8")


def report(root, seed=12, *, stable=False):
    rep = json.loads((root / "runs" / f"quick-s{seed}" / "report.json").read_text(encoding="utf-8"))
    return {k: v for k, v in rep.items() if k != "cost"} if stable else rep  # cost chứa giây thực


def test_a_killed_run_resumes_without_redoing_finished_pairs_and_matches_an_uninterrupted_run(tmp_path):
    full, resumed = tmp_path / "full", tmp_path / "resumed"
    reference = SiteModels()
    quick(full, "--repeats", "2", models=reference)

    dying = SiteModels(die_after=len(reference.calls) // 2)  # chết giữa chừng, như bị kill
    with pytest.raises(KeyboardInterrupt):
        quick(resumed, "--repeats", "2", models=dying)
    finished = results(resumed)
    assert 0 < len(finished) < 8

    relaunched = SiteModels()
    assert quick(resumed, "--repeats", "2", models=relaunched) == 0
    assert len(relaunched.calls) == len(reference.calls) - sum(row["calls"] for row in finished)
    assert results(resumed) == results(full) and report(resumed, stable=True) == report(full, stable=True)
    assert quick(resumed, "--repeats", "3") == 2  # cùng run, khác cấu hình: từ chối chứ không trộn


def test_budget_minutes_cuts_the_run_cleanly_and_a_relaunch_finishes_it(tmp_path):
    full, capped = tmp_path / "full", tmp_path / "capped"
    quick(full, "--repeats", "2")
    ticks = itertools.count(0, 30)  # đồng hồ giả: mỗi lần hỏi trôi 30 s
    deps = Deps(models=SiteModels(), notify=None, sleep=lambda _s: None)
    argv = ["quick", "--seed", "12", "--cases", "4", "--repeats", "2", "--root", str(capped)]

    assert eval_run.main([*argv, "--budget-minutes", "1.5"], deps, clock=lambda: next(ticks)) == 0
    assert len(results(capped)) == 2  # kiểm lúc 30 s, 60 s thì chạy; lúc 90 s thì dừng
    assert "CẮT NGANG" in run_text(capped)
    assert json.loads((capped / "runs" / "quick-s12" / "run.json").read_text(encoding="utf-8"))["status"] == "cut_short"

    assert eval_run.main(argv, deps) == 0
    assert "CẮT NGANG" not in run_text(capped) and report(capped, stable=True) == report(full, stable=True)


def baseline_file(tmp_path, rate, **label):
    path = tmp_path / f"baseline-{rate}.json"
    path.write_text(json.dumps({"tier": "quick", "source": "synthetic-candidate", **label,
                                "groups": {"all": {"rate": rate}}}), encoding="utf-8")
    return str(path)


def test_report_has_intervals_funnel_cost_and_a_regression_verdict_against_the_baseline(tmp_path):
    argv = ["quick", "--seed", "12", "--cases", "4", "--root", str(tmp_path)]  # mặc định 3 lần lặp
    deps = Deps(models=SiteModels(), notify=None, sleep=lambda _s: None)
    assert eval_run.main(argv, deps) == 0
    rep = report(tmp_path)
    assert rep["verdict"] == {"status": "no_baseline"}

    # 4 case x 3 lần = 12 lượt; cổng 3 qua 9, oracle gold qua 6; mô hình giả trả lời cố định nên 3 lần giống nhau
    assert rep["groups"]["all"] == {"trials": 12, "passed": 6, "rate": 50.0, "lo": 25.4, "hi": 74.6}  # Wilson 95% của 6/12
    assert {g: rep["groups"][g]["trials"] for g in ("replace", "insert")} == {"replace": 6, "insert": 6}
    assert [(f["stage"], f["reached"], f["passed"]) for f in rep["funnel"]] == [("gate3", 12, 9), ("gold_oracle", 9, 6)]
    assert rep["failure_classes"] == {"invalid_output": 3, "wrong_result": 3}
    assert rep["cost"]["gpu_s_per_success"] == 0.0 and rep["cost"]["wall_s_per_success"] > 0
    assert all(c["trials"] == 3 for c in rep["cases"]) and len(results(tmp_path)) == 12
    text = run_text(tmp_path)
    assert "Wilson 95%: 25.4-74.6%" in text and "phễu gate3: 9/12" in text and "lớp lỗi: invalid_output=3, wrong_result=3" in text

    # cận trên 74.6: mốc 90 tụt 15.4 điểm (> 10) bị từ chối; mốc 80 chỉ tụt 5.4 thì nhận
    assert eval_run.main([*argv, "--baseline", baseline_file(tmp_path, 90.0)], deps) == 1
    assert report(tmp_path)["verdict"]["groups"]["all"] == {"baseline": 90.0, "upper": 74.6, "drop": 15.4, "regressed": True}
    assert "TỪ CHỐI" in run_text(tmp_path)
    assert eval_run.main([*argv, "--baseline", baseline_file(tmp_path, 80.0)], deps) == 0
    assert report(tmp_path)["verdict"]["status"] == "accept"


def test_fast_tier_is_labelled_never_an_official_ship_rate_and_pure_ollama_is_kept_apart(tmp_path, monkeypatch, capsys):
    assert quick(tmp_path) == 0  # deps bơm vào = hạ tầng, candidate tổng hợp
    rep = report(tmp_path)
    assert (rep["tier"], rep["source"], rep["official_ship_rate"]) == ("quick", "synthetic-candidate", None)
    assert "[FAST TIER | synthetic-candidate]" in capsys.readouterr().out

    real = tmp_path / "real"
    monkeypatch.setattr(eval_run.Deps, "real", staticmethod(lambda: Deps(models=SiteModels(), notify=None, sleep=lambda _s: None)))
    argv = ["quick", "--seed", "12", "--cases", "4", "--repeats", "1", "--root", str(real)]
    assert eval_run.main(argv) == 0  # tự dựng Deps thật = chạy pure-Ollama
    assert report(real)["source"] == "pure-ollama" and "[FAST TIER | pure-ollama]" in capsys.readouterr().out
    assert eval_run.main([*argv, "--baseline", str(tmp_path / "runs" / "quick-s12" / "report.json")]) == 2  # khác nguồn: không so
    assert report(real)["verdict"]["status"] == "incomparable"
