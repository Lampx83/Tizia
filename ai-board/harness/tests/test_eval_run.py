"""Seam duy nhất của eval runner (quick + fast tier): eval_run.main(argv, deps, launcher=...) chạy trọn vẹn trên trang thật của repo ở commit
ghim, model giả (dataclass) + app giả (launcher cắm được) trong thư mục tạm, seed cố định. Oracle sản xuất là functional.run_text thật
(playwright) nhìn trang do launcher giả phục vụ. Chỉ soi báo cáo và file run ghi ra."""
import contextlib
import dataclasses
import functools
import http.server
import itertools
import json
import re
import shutil
import tempfile
import threading
from pathlib import Path

import pytest

import eval_fast
import eval_run
from main import Deps

pytest.importorskip("playwright.sync_api")
FILLER = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}
SEED = 9
PLAIN = "Em muốn sửa lại chữ trên trang cho gọn hơn"  # không có chữ trích dẫn → không có kỳ vọng parse được → không oracle


def wording(todo):
    """Chữ request mức 1-4 của loại có chữ: trích dẫn đúng chữ cũ/mới (oracle chữ parse được). Mức 5 và loại không phải chữ: lời thường."""
    facts, kind = [s["facts"] for s in todo["spec"]], todo["types"][0]
    if todo["level"] == 5 or kind in ("css_color", "size_hide", "change_link"):
        return PLAIN
    if kind == "replace_text":
        return " và ".join(f"đổi '{f['old']}' thành '{f['new']}'" for f in facts)
    if kind == "insert_text":
        return " và ".join(f"thêm '{f['new']}' sau '{f['after']}'" for f in facts)
    if kind == "remove_element":
        return " và ".join(f"xóa '{f['old']}'" for f in facts)
    if kind == "add_block":
        return " và ".join(f"thêm khối '{f['title']}' '{f['body']}'" for f in facts)
    return f"thêm trang mới '{facts[0]['title']}' có đoạn '{facts[0]['body']}'"  # new_page


@dataclasses.dataclass
class GoldModels:
    """Model giả đọc [key] trong title của prompt, tra gold trong corpus đã ghi. Theo mức khó của case: garbage_level = rác (cổng 3 chặn),
    blocked_level = gold + script ngoài (cổng 4 chặn), wrong_level = gold + hỏng chỗ khác (chữ vẫn hiện, gold bắt được), mức khác = đúng gold.
    broken_pages = case held-out/trang mới trả thiếu đoạn thân (chữ trích dẫn không hiện)."""

    root: Path
    seed: int = SEED
    garbage_level: int = 3
    blocked_level: int = 4
    wrong_level: int = 2
    broken_pages: bool = False
    gate3_model: str = "fake"
    gate3_model_light: str = "fake"
    calls: list = dataclasses.field(default_factory=list)
    die_after: int | None = None  # giả lập bị kill: KeyboardInterrupt sau chừng này lời gọi

    def generate(self, model, prompt, **kw):
        if self.die_after is not None and len(self.calls) >= self.die_after:
            raise KeyboardInterrupt
        key = re.search(r"- title: \[(\w+)\]", prompt).group(1)
        case = next(c for c in cases_of(self.root, self.seed) if c["key"] == key)
        self.calls.append(key)
        if case["level"] == self.garbage_level:
            return {"response": "không phải json", "prompt_eval_count": 120, "eval_count": 80}
        if "code" in case["gold"]:
            body = {"code": case["gold"]["code"].replace(case["check"]["body"], "") if self.broken_pages else case["gold"]["code"]}
        else:
            edits = list(case["gold"]["edits"])
            if case["level"] == self.blocked_level:
                edits.append({"search": "<html", "replace": '<script src="https://evil.example.com/x.js"></script><html'})
            elif case["level"] == self.wrong_level:
                edits.append({"search": "<html", "replace": '<html data-x="1"'})
            body = {"edits": edits}
        return {"response": json.dumps({**body, **FILLER}, ensure_ascii=False), "prompt_eval_count": 120, "eval_count": 80}


def cases_of(root, seed=SEED, side=None):
    where = {"dev": root / "corpus", "heldout": root / "heldout" / "corpus"}
    return [c for name, home in where.items() if side in (None, name)
            for c in json.loads((home / f"full-s{seed}" / "cases.json").read_text(encoding="utf-8"))]


def freeze(root, seed=SEED):
    """Vai người viết chữ request (dev ở corpus/, held-out ở heldout/): title mở đầu bằng [key] để model giả tra gold."""
    assert eval_run.main(["corpus", "--seed", str(seed), "--root", str(root)]) == 2
    for home in (root / "corpus", root / "heldout"):
        texts = {}
        for todo in json.loads((home / "texts-todo.json").read_text(encoding="utf-8")):
            text = wording(todo)
            texts[todo["key"]] = {"title": f"[{todo['key']}] {text}", "verify": "kiểm lại trang", "detail": f"{text} nhé [{todo['key']}]"}  # [key] cũng ở detail: chữ riêng từng case, không trùng giữa dev và held-out
        (home / "texts.json").write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    assert eval_run.main(["corpus", "--seed", str(seed), "--root", str(root)]) == 0


@pytest.fixture(scope="module")
def root(tmp_path_factory):
    """1 thư mục dữ liệu cho cả file: corpus + checkout ở commit ghim dựng 1 lần."""
    root = tmp_path_factory.mktemp("eval")
    freeze(root)
    return root


class Fleet:
    """Launcher giả: mỗi lần được gọi dựng 1 'app' = máy chủ tĩnh phục vụ <cây>/public (chứa file candidate chép đè) + token giả. Ghi lại các lần gọi."""

    def __init__(self):
        self.launches = []

    @contextlib.contextmanager
    def __call__(self, checkout, root):
        tree = Path(tempfile.mkdtemp(prefix="fake-app-"))
        (tree / "public" / "api").mkdir(parents=True)
        (tree / "public" / "api" / "health").write_text("ok", encoding="utf-8")
        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(tree / "public")))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        self.launches.append(tree)
        try:
            yield eval_fast.App(f"http://127.0.0.1:{server.server_port}", tree, lambda stage: {"token": "fake-session"})
        finally:
            server.shutdown()
            server.server_close()
            shutil.rmtree(tree, ignore_errors=True)


def deps_for(models):
    return Deps(models=models, notify=None, sleep=lambda _s: None)


def run(root, *argv, models=None, fleet=None, tier="quick", seed=SEED, **kw):
    argv = [tier, "--seed", str(seed), "--root", str(root), *argv]
    return eval_run.main(argv, deps_for(models or GoldModels(root, seed)), launcher=fleet or Fleet(), **kw)


def run_dir(root, name):
    return root / "runs" / name


def rows_of(root, name, side="dev"):
    home = run_dir(root, name) if side == "dev" else root / "heldout" / "runs" / name
    rows = [json.loads(line) for line in (home / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    return [{k: v for k, v in row.items() if k != "wall_s"} for row in rows]  # wall_s = đồng hồ thật


def report(root, name, *, stable=False):
    rep = json.loads((run_dir(root, name) / "report.json").read_text(encoding="utf-8"))
    return {k: v for k, v in rep.items() if k != "cost"} if stable else rep  # cost chứa giây thực


def expected_end(case):
    """Tầng dừng lượt theo cách model giả làm theo mức khó và theo việc request có chữ trích dẫn không."""
    quoted = wording({"level": case["level"], "types": case["types"], "spec": case["spec"]}) != PLAIN
    if case["level"] == 3:
        return "gate3"
    if case["level"] == 4 or any("javascript:" in s.get("line", "") for s in case["spec"]):
        return "gate4"  # mức 4: script ngoài. Thật: guard.scan chặn cả dòng sửa chữ chứa href="javascript:..." có sẵn (dương tính giả của cổng 4)
    if not quoted:
        return "no_oracle"
    return "gold" if case["level"] == 2 else "shipped"


def allowed_ends(case):
    """Như expected_end, nhưng oracle chữ cũng có thể chặn: chữ mới nằm trong phần tử ẩn lúc tải trang (vd thẻ display:none đợi bấm) thì
    text-visible-v1 không thấy dù candidate đúng. Điều này phụ thuộc trang thật nên test không đoán trước từng case."""
    end = expected_end(case)
    return {end, "oracle"} if end in ("gold", "shipped") else {end}


@pytest.fixture(scope="module")
def dev_run(root):
    """Một lần chạy fast tier trọn split dev (42 case x 1 lần) dùng cho nhiều test."""
    models, fleet, overlays = GoldModels(root), Fleet(), []
    real_overlay = eval_fast.overlay

    @contextlib.contextmanager
    def spy(app, checkout, files):  # ghi lại: trong lúc oracle chạy, file candidate có thật trên cây; xong thì cây trả về đúng bản base
        with real_overlay(app, checkout, files):
            during = {rel: (app.tree / rel).read_text(encoding="utf-8") == text for rel, text in files.items()}
            yield
        overlays.append({"during": during, "restored": {rel: (app.tree / rel).read_bytes() if (app.tree / rel).exists() else None for rel in files},
                         "base": {rel: eval_fast._base_bytes(checkout, rel) for rel in files}})

    patch = pytest.MonkeyPatch()
    patch.setattr(eval_fast, "overlay", spy)
    try:
        assert run(root, "--split", "dev", "--repeats", "1", "--fast-tier", tier="full", models=models, fleet=fleet) == 0
    finally:
        patch.undo()
    name = f"full-s{SEED}-dev"
    return {"name": name, "report": report(root, name), "rows": rows_of(root, name), "fleet": fleet, "overlays": overlays}


def test_fast_tier_ends_each_trial_at_the_stage_that_stopped_it_and_labels_it_never_official(root, dev_run):
    rep, rows = dev_run["report"], dev_run["rows"]
    cases = {c["id"]: c for c in cases_of(root, side="dev")}
    assert len(rows) == len(cases) == 42
    for row in rows:  # mỗi lượt có tầng dừng đúng theo cách model giả làm
        assert row["ended"] in allowed_ends(cases[row["case"]]), (row["case"], row["ended"], row.get("gate4_reason"), row.get("prod_reason"))
        if row["ended"] == "oracle":  # oracle chặn: lý do nói chữ nào không hiện / còn hiện
            assert row["prod"] == "failed" and re.match(r"Chữ (người dùng yêu cầu không hiển thị|cần bỏ vẫn còn)", row["prod_reason"])
    assert {"gate3", "gate4", "no_oracle", "gold", "shipped"} <= {r["ended"] for r in rows}
    assert (rep["tier"], rep["fast_tier"], rep["official_ship_rate"]) == ("full", True, None) and "fast tier" in rep["tier_label"]
    assert [f["stage"] for f in rep["funnel"]] == ["gate3", "gate4", "production_oracle", "gold_oracle"]
    by = lambda *ends: sum(r["ended"] in ends for r in rows)  # noqa: E731
    reached = [42, 42 - by("gate3"), 42 - by("gate3", "gate4"), by("gold", "shipped")]
    assert [f["reached"] for f in rep["funnel"]] == reached
    assert rep["funnel"][2]["no_oracle"] == by("no_oracle") and rep["funnel"][3]["passed"] == by("shipped")
    assert {r["gate4"] for r in rows} == {None, "passed", "blocked"} and all(re.match(r"(external_script|injection):", r["gate4_reason"]) for r in rows if r["gate4"] == "blocked")
    assert {r["prod_probe"] for r in rows if r["ended"] in ("shipped", "gold", "oracle")} == {"text-visible-v1"}
    assert all(r["prod_probe"] is None for r in rows if r["ended"] == "no_oracle" and r["level"] == 5)
    for line in rep["cases"]:  # báo cáo từng case ghi tầng dừng
        (end,) = line["ended"]
        assert line["ended"] == {end: 1} and end in allowed_ends(cases[line["id"]])


def test_ship_rate_under_the_production_oracle_sits_next_to_correctness_under_gold_so_the_coverage_gap_shows(root, dev_run):
    rep, rows = dev_run["report"], dev_run["rows"]
    shipped, correct = sum(r["shipped"] for r in rows), sum(r["oracle"] for r in rows)
    assert (rep["ship"]["all"]["passed"], rep["groups"]["all"]["passed"]) == (shipped, correct) and shipped != correct
    assert {"tier=a", "level=5", "style=plain", "replace_text", "split=dev"} <= set(rep["groups"])  # tầng, mức, kiểu câu, phép biến đổi
    assert set(rep["ship"]) == set(rep["coverage_gap"]) == set(rep["groups"])
    level5 = rep["coverage_gap"]["level=5"]  # lời thường: đúng theo gold nhưng không có oracle → ship 0 theo thiết kế
    assert (level5["shipped"], level5["correct"], level5["correct_no_oracle"]) == (0, rep["groups"]["level=5"]["trials"], rep["groups"]["level=5"]["trials"])
    assert rep["ship"]["level=5"]["rate"] == 0.0 and rep["groups"]["level=5"]["rate"] == 100.0
    assert rep["coverage_gap"]["level=2"]["false_pass"] == sum(r["ended"] == "gold" for r in rows) > 0  # oracle cho qua bản gold bắt được sai
    assert rep["ship"]["all"]["lo"] < rep["ship"]["all"]["rate"] < rep["ship"]["all"]["hi"]
    text = (run_dir(root, dev_run["name"]) / "report.txt").read_text(encoding="utf-8")
    assert "ship (oracle sản xuất)" in text and "phễu production_oracle" in text and "độ phủ oracle level=5" in text


def test_the_app_starts_once_and_each_candidate_page_is_there_during_its_oracle_run_and_back_to_base_after(root, dev_run):
    assert len(dev_run["fleet"].launches) == 1  # 1 checkout ghim → 1 app cho cả run
    ran = [r for r in dev_run["rows"] if r["ended"] in ("shipped", "gold", "oracle")]  # mọi lượt tới được oracle chữ
    assert len(dev_run["overlays"]) == len(ran) > 0
    for seen in dev_run["overlays"]:
        assert all(seen["during"].values()) and seen["restored"] == seen["base"]


def fresh(root, tmp_path, name):
    """Root mới với cùng chữ request đóng băng (chưa có checkout/lượt chạy nào)."""
    out = tmp_path / name
    for home in ("corpus", "heldout"):
        (out / home).mkdir(parents=True)
        shutil.copy(root / home / "texts.json", out / home / "texts.json")
    return out


@dataclasses.dataclass
class Garbage:
    gate3_model: str = "fake"
    gate3_model_light: str = "fake"

    def generate(self, model, prompt, **kw):
        return {"response": "không phải json", "prompt_eval_count": 120, "eval_count": 80}


def test_a_run_where_no_candidate_gets_past_gate_3_never_starts_the_app(root, tmp_path):
    fleet, only = Fleet(), fresh(root, tmp_path, "garbage")
    assert run(only, "--cases", "3", "--repeats", "1", fleet=fleet, models=Garbage()) == 0
    rows = rows_of(only, f"quick-s{SEED}")
    assert len(rows) == 3 and {r["ended"] for r in rows} == {"gate3"} and {r["prod"] for r in rows} == {"skipped"} and {r["gate4"] for r in rows} == {None}
    assert fleet.launches == []


def test_quick_samples_dev_cases_deterministically_from_the_real_corpus_and_a_fresh_root_picks_the_same(root, tmp_path):
    models = GoldModels(root)  # chữ đóng băng giống hệt ở root khác; budget 0 → báo cáo liệt kê case đã chọn, chưa chạy lượt nào
    first, second = fresh(root, tmp_path, "first"), fresh(root, tmp_path, "second")
    assert run(first, "--cases", "8", "--budget-minutes", "0", models=models) == 0 and models.calls == []
    picked = [c["id"] for c in report(first, f"quick-s{SEED}")["cases"]]
    assert len(picked) == 8 and set(picked) <= {c["id"] for c in cases_of(root, side="dev")}  # chỉ dev, trang thật
    assert picked == [c["id"] for c in cases_of(root, side="dev") if c["id"] in set(picked)]
    assert run(second, "--cases", "8", "--budget-minutes", "0", models=models) == 0
    assert [c["id"] for c in report(second, f"quick-s{SEED}")["cases"]] == picked
    assert run(second, "--cases", "10", "--budget-minutes", "0", models=models) == 2  # cùng run, khác số case: từ chối chứ không trộn


def test_a_killed_quick_run_resumes_without_redoing_finished_pairs_and_matches_an_uninterrupted_run(root, tmp_path):
    full, resumed = fresh(root, tmp_path, "full"), fresh(root, tmp_path, "resumed")
    reference = GoldModels(root)
    assert run(full, "--cases", "4", "--repeats", "2", models=reference) == 0
    name = f"quick-s{SEED}"

    dying = GoldModels(root, die_after=len(reference.calls) // 2)  # chết giữa chừng, như bị kill
    with pytest.raises(KeyboardInterrupt):
        run(resumed, "--cases", "4", "--repeats", "2", models=dying)
    finished = rows_of(resumed, name)
    assert 0 < len(finished) < 8

    relaunched = GoldModels(root)
    assert run(resumed, "--cases", "4", "--repeats", "2", models=relaunched) == 0
    assert len(relaunched.calls) == len(reference.calls) - sum(row["calls"] for row in finished)
    assert rows_of(resumed, name) == rows_of(full, name) and report(resumed, name, stable=True) == report(full, name, stable=True)
    assert run(resumed, "--cases", "4", "--repeats", "3") == 2  # cùng run, khác cấu hình: từ chối chứ không trộn


def test_budget_minutes_cuts_the_run_cleanly_and_a_relaunch_finishes_it(root, tmp_path):
    capped = fresh(root, tmp_path, "capped")
    ticks = itertools.count(0, 30)  # đồng hồ giả: mỗi lần hỏi trôi 30 s
    args = ("--cases", "4", "--repeats", "2")
    name = f"quick-s{SEED}"
    assert run(capped, *args, "--budget-minutes", "1.5", clock=lambda: next(ticks)) == 0
    assert len(rows_of(capped, name)) == 2  # kiểm lúc 30 s, 60 s thì chạy; lúc 90 s thì dừng
    assert "CẮT NGANG" in (run_dir(capped, name) / "report.txt").read_text(encoding="utf-8")
    assert json.loads((run_dir(capped, name) / "run.json").read_text(encoding="utf-8"))["status"] == "cut_short"
    assert run(capped, *args) == 0
    assert len(rows_of(capped, name)) == 8 and "CẮT NGANG" not in (run_dir(capped, name) / "report.txt").read_text(encoding="utf-8")


def baseline_file(tmp_path, rate, **label):
    path = tmp_path / f"baseline-{rate}.json"
    path.write_text(json.dumps({"tier": "full", "source": "synthetic-candidate", **label, "groups": {"all": {"rate": rate}}}), encoding="utf-8")
    return str(path)


def test_report_has_wilson_intervals_cost_and_a_regression_verdict_against_the_baseline(root, dev_run, tmp_path):
    rep = dev_run["report"]
    assert rep["verdict"] == {"status": "no_baseline"}
    everything = rep["groups"]["all"]
    assert (everything["trials"], everything["lo"] < everything["rate"] < everything["hi"]) == (42, True)
    assert rep["failure_classes"] and rep["cost"]["gpu_s_per_success"] == 0.0 and rep["cost"]["wall_s_per_success"] > 0
    upper = everything["hi"]
    again = ("--split", "dev", "--repeats", "1", "--fast-tier")  # resume: mọi lượt đã xong, không gọi model, chỉ tính lại báo cáo
    assert run(root, *again, "--baseline", baseline_file(tmp_path, upper + 15.0), tier="full", models=GoldModels(root)) == 1
    assert report(root, dev_run["name"])["verdict"]["groups"]["all"] == {"baseline": upper + 15.0, "upper": upper, "drop": 15.0, "regressed": True}
    assert "TỪ CHỐI" in (run_dir(root, dev_run["name"]) / "report.txt").read_text(encoding="utf-8")
    assert run(root, *again, "--baseline", baseline_file(tmp_path, upper + 5.0), tier="full") == 0
    assert report(root, dev_run["name"])["verdict"]["status"] == "accept"


def test_a_broken_environment_aborts_the_run_with_exit_2_and_never_scores_it(root, tmp_path, capsys):
    broken = fresh(root, tmp_path, "broken")

    @contextlib.contextmanager
    def no_app(checkout, root_dir):
        raise eval_fast.FastTierError("app native thoát mã 1: Error: ENOENT")
        yield

    capsys.readouterr()
    assert run(broken, "--split", "dev", "--repeats", "1", "--fast-tier", tier="full", fleet=no_app) == 2  # case đầu có kỳ vọng chữ là cần app ngay
    assert "fast tier không chạy được: app native thoát mã 1" in capsys.readouterr().err
    assert json.loads((run_dir(broken, f"full-s{SEED}-dev") / "run.json").read_text(encoding="utf-8"))["status"] == "aborted"
    assert not (run_dir(broken, f"full-s{SEED}-dev") / "report.json").exists()  # không có báo cáo nửa vời


def test_pure_ollama_source_is_kept_apart_from_injected_synthetic_candidates(root, tmp_path, monkeypatch, capsys):
    real = fresh(root, tmp_path, "real")
    assert run(root, "--cases", "2", "--repeats", "1") == 0
    rep = report(root, f"quick-s{SEED}")
    assert (rep["tier"], rep["source"], rep["official_ship_rate"]) == ("quick", "synthetic-candidate", None)
    assert "[FAST TIER | synthetic-candidate]" in capsys.readouterr().out
    monkeypatch.setattr(eval_run.Deps, "real", staticmethod(lambda: deps_for(GoldModels(root))))
    monkeypatch.setattr(eval_fast, "native_launcher", Fleet())  # không có deps bơm vào = run pure-Ollama (model giả thay Deps.real)
    argv = ["quick", "--seed", str(SEED), "--cases", "2", "--repeats", "1", "--root", str(real)]
    assert eval_run.main(argv) == 0
    assert report(real, f"quick-s{SEED}")["source"] == "pure-ollama" and "[FAST TIER | pure-ollama]" in capsys.readouterr().out
    assert eval_run.main([*argv, "--baseline", str(run_dir(root, f"quick-s{SEED}") / "report.json")]) == 2  # khác nguồn: không so
    assert report(real, f"quick-s{SEED}")["verdict"]["status"] == "incomparable"


def test_held_out_detail_from_the_fast_tier_never_leaves_its_vault_and_the_report_keeps_scores_only(root, capsys):
    held = cases_of(root, side="heldout")
    broken = GoldModels(root, broken_pages=True, garbage_level=-1, blocked_level=-1, wrong_level=-1)  # trang mới thiếu thân: oracle chữ báo lỗi kèm chữ trích dẫn
    assert run(root, "--split", "all", "--cases", "6", "--repeats", "1", "--fast-tier", tier="full", models=broken) == 0
    name = f"full-s{SEED}-all"
    secrets = {c[k] for c in held for k in ("id", "key", "title", "detail")}
    secrets |= {c["check"]["body"] for c in held if "body" in c["check"]} | {e["replace"] for c in held for e in c["gold"].get("edits", [])}
    secrets |= {part for c in held for need in c["check"].get("required", []) for part in need if len(part) >= 20}
    vault = root / "heldout"
    leaked = [str(p) for p in root.rglob("*") if p.is_file() and vault not in p.parents and "checkouts" not in p.parts
              and any(secret.encode("utf-8") in p.read_bytes() for secret in secrets)]
    assert not leaked, leaked
    assert not any(secret in capsys.readouterr().out for secret in secrets)
    vault_rows = rows_of(root, name, side="heldout")
    assert len(vault_rows) == 6 and all("ended" in row and "prod" in row for row in vault_rows)
    assert any(row["prod"] == "failed" and any(s in (row["prod_reason"] or "") for s in secrets) for row in vault_rows)  # chi tiết thô (kèm chữ held-out) chỉ ở vault
    rep = report(root, name)
    assert rep["groups"]["split=heldout"]["trials"] == 6 and "split=heldout" in rep["ship"] and "split=heldout" in rep["coverage_gap"]
    assert not {line["id"] for line in rep["cases"]} & {row["case"] for row in vault_rows}
