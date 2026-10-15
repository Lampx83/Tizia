"""Seam: eval_run.main(["recall", ...]) trên corpus có sẵn dưới --root (không model, không mạng), thư mục tạm, seed cố định.
Corpus synthetic 3 trang do eval_run.write_corpus dựng (quick đã chuyển sang corpus trang thật); không test riêng hàm đo, chỉ soi báo cáo và file ghi ra."""
import json
from pathlib import Path

import eval_run


def make_corpus(root, cases=4):
    eval_run.write_corpus(Path(root), 12, cases)


def recall(root, *extra):
    assert eval_run.main(["recall", "--root", str(root), *extra]) == 0  # không deps: không dựng model, không đọc env
    return json.loads((root / "recall" / "latest.json").read_text(encoding="utf-8"))


def test_recall_reports_files_gold_lines_and_section_costs_per_case_and_group_without_a_model(tmp_path, capsys):
    make_corpus(tmp_path)
    capsys.readouterr()  # bỏ báo cáo của quick
    rep = recall(tmp_path)
    assert [r["case"] for r in rep["rows"]] == [f"q12-0{i}" for i in range(4)]
    for row in rep["rows"]:
        assert row["corpus"] == "quick-s12" and row["gate1"]["hit"] and row["gate1"]["found"] == 1
        g3 = row["gate3"]
        assert g3["hit"] and g3["covered"] == g3["gold_lines"] > 0  # replace: dòng cũ; insert: dòng neo
        assert {"skill", "excerpt", "outline", "repomap", "exemplar", "lessons", "tree", "other", "total"} <= set(g3["chars"])
        assert g3["chars"]["skill"] > 0 and g3["chars"]["excerpt"] > 0
        assert g3["chars"]["total"] == sum(v for k, v in g3["chars"].items() if k != "total")
    assert set(rep["groups"]) == {"all", "kind=replace", "kind=insert"}
    all_group = rep["groups"]["all"]
    assert (all_group["cases"], all_group["gate1"]["hit"], all_group["gate3"]["hit"]) == (4, 4, 4)
    assert (all_group["gate1"]["lo"], all_group["gate1"]["hi"]) == (51.0, 100.0)  # Wilson 95% của 4/4
    assert all_group["gate3"]["line_coverage"] == 100.0 and all_group["gate3"]["mean_chars"]["total"] > 0
    printed = capsys.readouterr().out
    assert "[RECALL | không model]" in printed and "quick-s12/q12-00" in printed and "nhóm kind=insert" in printed
    assert (tmp_path / "recall" / "latest.txt").read_text(encoding="utf-8").strip() == printed.strip()


def test_changing_retrieval_weights_shows_a_recall_delta_with_a_bootstrap_interval(tmp_path):
    make_corpus(tmp_path)
    alt = tmp_path / "alt-weights.json"  # 1 từ khoá, đuôi 1 dòng: câu thay thế vẫn trúng (từ khoá đầu), câu chèn mất dòng neo
    alt.write_text(json.dumps({"max_keywords": {"value": 1}, "tail_lines": {"value": 1}, "radius": {"value": 1}}), encoding="utf-8")
    rep = recall(tmp_path, "--weights-alt", str(alt))
    assert rep["weights"]["sha"] != rep["weights_alt"]["sha"]
    delta = rep["delta"]
    assert delta["kind=replace"]["gate3_hit"] == {"delta": 0.0, "lo": 0.0, "hi": 0.0, "cases": 2}
    assert delta["kind=insert"]["gate3_hit"] == {"delta": -100.0, "lo": -100.0, "hi": -100.0, "cases": 2}
    overall = delta["all"]["gate3_hit"]
    assert overall["delta"] == -50.0 and overall["lo"] < overall["delta"] < overall["hi"] <= 0.0
    assert delta["all"]["gate1_hit"]["delta"] == 0.0 and delta["all"]["gate3_line_coverage"]["delta"] < 0
    assert recall(tmp_path, "--weights-alt", str(alt))["delta"] == delta  # seed cố định: lặp lại y hệt
    assert "so với trọng số" in (tmp_path / "recall" / "latest.txt").read_text(encoding="utf-8")


def test_recall_with_no_corpus_is_a_config_error(tmp_path):
    assert eval_run.main(["recall", "--root", str(tmp_path)]) == 2
