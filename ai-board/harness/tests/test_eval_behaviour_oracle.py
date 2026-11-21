"""Behaviour oracle: red on base, green on gold, versioned corpus, eval-only checks, sealed held-out never opened."""
import builtins
import json
import os
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import url2pathname

import pytest

from evaluation import behaviour_oracle as bo
from evaluation import eval_corpus
from evaluation import gold as eval_gold
from gate5 import guest_inputs
from test_eval_gold import GOOD, EditModels
from runtime.pipeline import Deps

BASE = "<html><body>\n<p>Chu cu</p>\n</body></html>\n"
NEW = "Chu moi hoan toan"
PAGE_BODY = "Than trang moi"


def replace_case(cid="replace-1", split="dev"):
    edit = {"search": ">Chu cu</p>", "replace": f">{NEW}</p>"}
    return {"id": cid, "key": cid, "kind": "replace_text", "split": split, "base_sha": "x", "file": "public/a.html",
            "gold": {"edits": [edit]}, "check": {"mode": "equal", "required": [[]]},
            "spec": [{"type": "replace_text", "facts": {"old": "Chu cu", "new": NEW, "tag": "p"}}],
            "title": "t", "verify": "v", "detail": "d"}


def color_case():
    edit = {"search": "<body>", "replace": '<body style="color:#1d4ed8">'}
    return {**replace_case("color-1"), "kind": "css_color", "gold": {"edits": [edit]},
            "spec": [{"type": "css_color", "facts": {"selector": "body", "old": "#000", "new": "#1d4ed8"}}]}


def page_case():
    page = {"title": "Cam on", "body": PAGE_BODY, "href": "/a.html", "label": "Ve"}
    html = f"<html><head><title>Cam on</title></head><body><h1>Cam on</h1><p>{PAGE_BODY}</p><a href=\"/a.html\">Ve</a></body></html>"
    return {"id": "page-1", "key": "page-1", "kind": "new_page", "split": "dev", "base_sha": "x", "file": "public/moi.html",
            "gold": {"code": html}, "check": {"mode": "page", "title": "Cam on", "body": PAGE_BODY, "href": "/a.html"},
            "spec": [{"type": "new_page", "facts": page}], "title": "t", "verify": "v", "detail": "d"}


def fake_dom(url, selector, prop):
    html = Path(url2pathname(urlsplit(url).path.lstrip("/") if os.name != "nt" else urlsplit(url).path)).read_text(encoding="utf-8")
    return True, "rgb(29, 78, 216)" if "1d4ed8" in html else "rgb(0, 0, 0)"


def read_base(case):
    return None if case["id"] == "page-1" else BASE.replace("Chu cu", NEW) if case["id"] == "green-base" else BASE


def write_cases(root, cases, seed=1):
    home = root / "corpus" / f"full-s{seed}"
    home.mkdir(parents=True, exist_ok=True)
    (home / "cases.json").write_text(json.dumps(cases), encoding="utf-8")


def test_keeps_red_to_green_cases_and_drops_the_rest_with_a_reason(tmp_path):
    green_base = {**replace_case("green-base")}
    red_gold = {**replace_case("red-gold"), "gold": {"edits": [{"search": ">Chu cu</p>", "replace": ">Khac han</p>"}]}}
    unknown = {**replace_case("odd"), "spec": [{"type": "mystery", "facts": {}}]}
    write_cases(tmp_path, [replace_case(), color_case(), page_case(), green_base, red_gold, unknown])
    out = bo.build(tmp_path, 1, read_base, fake_dom)
    assert out["kept"] == ["color-1", "page-1", "replace-1"]
    reasons = {d["id"]: d["reason"] for d in out["dropped"]}
    assert reasons == {"green-base": "check green on base", "red-gold": "check red on gold", "odd": "no behaviour check for this change type"}
    assert set(bo.load(tmp_path, out["version"])) == set(out["kept"])


def test_dom_checks_without_a_probe_are_dropped_not_guessed(tmp_path):
    write_cases(tmp_path, [replace_case(), color_case()])
    out = bo.build(tmp_path, 1, read_base)
    assert out["kept"] == ["replace-1"] and out["dropped"][0]["reason"].startswith("unrunnable")


def test_same_set_same_version_changed_set_new_version_and_never_overwrites(tmp_path):
    write_cases(tmp_path, [replace_case()])
    first = bo.build(tmp_path, 1, read_base)
    assert bo.build(tmp_path, 1, read_base)["version"] == first["version"]
    write_cases(tmp_path, [replace_case(), page_case()])
    second = bo.build(tmp_path, 1, read_base)
    assert second["version"] != first["version"] and set(bo.load(tmp_path, first["version"])) == {"replace-1"}
    tampered = Path(first["dir"]) / "behaviour.json"
    tampered.write_text("{}", encoding="utf-8")
    write_cases(tmp_path, [replace_case()])
    with pytest.raises(RuntimeError, match="different content"):
        bo.build(tmp_path, 1, read_base)
    assert tampered.read_text(encoding="utf-8") == "{}"


def test_builder_never_opens_a_heldout_path(tmp_path, monkeypatch):
    sealed_dir = tmp_path / "heldout" / "corpus" / "full-s1"
    sealed_dir.mkdir(parents=True)
    (sealed_dir / "cases.json").write_text("[]", encoding="utf-8")
    write_cases(tmp_path, [replace_case(), replace_case("held-1", "heldout"), replace_case("sealed-dev")])
    opened = []
    real_open, real_listdir, real_scandir = builtins.open, os.listdir, os.scandir
    monkeypatch.setattr(builtins, "open", lambda f, *a, **k: (opened.append(str(f)), real_open(f, *a, **k))[1])
    monkeypatch.setattr(os, "listdir", lambda p=".": (opened.append(str(p)), real_listdir(p))[1])
    monkeypatch.setattr(os, "scandir", lambda p=".": (opened.append(str(p)), real_scandir(p))[1])
    for name in ("read_text", "read_bytes", "open", "iterdir", "glob", "rglob", "exists", "is_file", "is_dir", "stat"):
        monkeypatch.setattr(Path, name, (lambda real: lambda self, *a, **k: (opened.append(str(self)), real(self, *a, **k))[1])(getattr(Path, name)))
    out = bo.build(tmp_path, 1, read_base, sealed={"sealed-dev"})
    assert out["kept"] == ["replace-1"] and out["dropped"] == []
    assert opened and not [p for p in opened if "heldout" in p]
    assert "held-1" not in json.dumps(out) and "sealed-dev" not in json.dumps(out)


def test_checks_never_reach_the_worker_the_candidate_checkout_or_the_guest(tmp_path, monkeypatch):
    write_cases(tmp_path, [page_case()])
    version = bo.build(tmp_path, 1, read_base)["version"]
    checkout = tmp_path / "checkouts" / "x"
    checkout.mkdir(parents=True)
    monkeypatch.setattr(eval_corpus, "checkout_at", lambda *a: checkout)
    record = eval_corpus.case_record(page_case(), tmp_path, None, bo.load(tmp_path, version))
    seen = json.dumps({k: v for k, v in record.items() if not callable(v)}, ensure_ascii=False)
    state = {"plan": {"subtasks": [record["subtask"]]}, "checkout_source": record["checkout"], "request_detail": record["detail"]}
    shipped = json.dumps(guest_inputs.build(state), ensure_ascii=False) + seen
    assert "text_present" not in shipped and "http_status" not in shipped and "checks" not in guest_inputs.build(state)
    assert not [p for p in checkout.rglob("*") if p.is_file()]
    assert checkout not in Path(bo.build(tmp_path, 1, read_base)["dir"]).parents


def test_behaviour_is_primary_a_different_valid_solution_passes_and_gold_match_is_secondary(tmp_path, monkeypatch):
    write_cases(tmp_path, [page_case()])
    behaviour = bo.load(tmp_path, bo.build(tmp_path, 1, read_base)["version"])
    monkeypatch.setattr(eval_corpus, "checkout_at", lambda *a: tmp_path)
    record = eval_corpus.case_record(page_case(), tmp_path, None, behaviour)
    different = f"<html><title>Khac</title><body><section>{PAGE_BODY}</section></body></html>"
    assert record["oracle"](different) is True and record["secondary"](different) is False
    assert record["oracle"](page_case()["gold"]["code"]) and record["secondary"](page_case()["gold"]["code"])
    assert record["oracle"]("<html>trong</html>") is False


def test_run_case_reports_gold_match_next_to_the_verdict_and_lists_disagreements():
    deps = Deps(models=EditModels(GOOD), notify=None, sleep=lambda _s: None)
    case = {**eval_gold.CASES["edit-text"], "oracle": lambda html: True, "secondary": lambda html: False}
    row = eval_gold.run_case("edit-text", case, "fake", deps)
    assert row["oracle"] is True and row["gold_match"] is False
    agree = {"case": "ok", "oracle": True, "gold_match": True}
    assert bo.disagreements([row, agree, {"case": "plain", "oracle": True}]) == [{"case": "edit-text", "behaviour": True, "gold_match": False}]
