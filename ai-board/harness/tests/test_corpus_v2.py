"""Corpus v2 builder on synthetic pages: stratified by fix type, page-disjoint, meaningful text, own seed + hash."""
import json
from pathlib import Path
from collections import defaultdict

import pytest

from evaluation import corpus_v2, eval_corpus

TAGS = ("p", "li", "h2", "span")


def make_pages(n: int = 14) -> dict[str, str]:
    pages = {}
    for i in range(n):
        rules = "\n".join(f"    .r{i}x{j} {{ color:#11{j}{j}22; font-size:{12 + j}px; margin:0 }}" for j in range(6))
        lines = "\n".join(f"  <{TAGS[j % 4]}>Muc so {j} cua trang so {i} noi dung rieng</{TAGS[j % 4]}>" for j in range(16))
        links = "\n".join(f'  <a href="/p{(i + j + 1) % n}.html">Lien ket {i} den {j}</a>' for j in range(4))
        pages[f"public/p{i}.html"] = (f"<!DOCTYPE html>\n<html>\n<head>\n  <style>\n{rules}\n  </style>\n</head>\n<body>\n"
                                      f"{lines}\n{links}\n</body>\n</html>\n")
    return pages


@pytest.fixture(scope="module")
def cases():
    return corpus_v2.plan(7, make_pages())


def split(cases, side):
    return [c for c in cases if c["split"] == side]


def test_every_shared_type_in_both_splits(cases):
    dev, held = {c["kind"] for c in split(cases, "dev")}, {c["kind"] for c in split(cases, "heldout")}
    shared = set(eval_corpus.CELLS) - set(corpus_v2.HELDOUT_ONLY)
    assert shared <= dev and shared <= held


def test_pages_disjoint(cases):
    assert eval_corpus.page_overlap(cases) == []


def test_heldout_only_types_small_and_separate(cases):
    only = [c for c in cases if c["kind"] in corpus_v2.HELDOUT_ONLY]
    assert only and {c["split"] for c in only} == {"heldout"}
    assert not any(c["kind"] in corpus_v2.HELDOUT_ONLY for c in split(cases, "dev"))
    assert all(c["group"] == "heldout_only" for c in only) and len(only) <= 4
    assert {c["group"] for c in cases if c["kind"] not in corpus_v2.HELDOUT_ONLY} == {"shared"}


def test_gold_applies_and_text_is_meaningful(cases):
    pages = make_pages()
    for c in cases:
        if "edits" in c["gold"]:
            eval_corpus.apply_gold(pages[c["file"]], c["gold"]["edits"])
        assert len(c["title"]) > 10 and c["verify"] and c["detail"]
    news = [f["new"] for c in cases for f in (s["facts"] for s in c["spec"]) if isinstance(f.get("new"), str) and f["new"].endswith(".")]
    assert news and all(not set(n.lower().strip(".").split()) <= set(eval_corpus.WORDS) for n in news)


def test_deterministic_and_seed_sensitive():
    a, b, c = (corpus_v2.plan(s, make_pages()) for s in (7, 7, 8))
    assert a == b and [x["key"] for x in a] != [x["key"] for x in c]


def test_exclude_pages_never_used():
    banned = {f"public/p{i}.html" for i in range(3)}
    assert not banned & {c["file"] for c in corpus_v2.plan(7, make_pages(), exclude=banned)}


def test_write_hash_and_layout(tmp_path):
    out = corpus_v2.write(tmp_path, 7, make_pages())
    again = corpus_v2.write(tmp_path, 7, make_pages())
    assert out["content_hash"] == again["content_hash"]
    base = tmp_path / "corpus-v2" / "s7"
    man = json.loads((base / "manifest.json").read_text(encoding="utf-8"))
    assert man["version"] == 2 and man["seed"] == 7 and man["content_hash"] == out["content_hash"]
    dev = json.loads((base / "cases.json").read_text(encoding="utf-8"))
    held = json.loads((tmp_path / eval_corpus.VAULT / "corpus-v2" / "s7" / "cases.json").read_text(encoding="utf-8"))
    assert {c["split"] for c in dev} == {"dev"} and {c["split"] for c in held} == {"heldout"}
    assert "heldout" not in json.dumps(man["cases"]) and all("pages" not in v for v in man["split"].values())


def test_write_refuses_changed_content(tmp_path):
    corpus_v2.write(tmp_path, 7, make_pages())
    with pytest.raises(corpus_v2.CorpusV2Error):
        corpus_v2.write(tmp_path, 7, make_pages(), base_sha="f" * 40)


def test_exclude_file_rejects_sealed_path(tmp_path):
    for name in ("heldout", "held-out", "sealed"):
        with pytest.raises(corpus_v2.CorpusV2Error):
            corpus_v2.load_exclude(tmp_path / name / "split.json")


def test_load_exclude_reads_page_list(tmp_path):
    f = tmp_path / "split.json"
    f.write_text(json.dumps(["public/a.html"]), encoding="utf-8")
    assert corpus_v2.load_exclude(f) == {"public/a.html"}


def test_target_counts_give_exact_split_sizes_and_disjoint_pages():
    from evaluation import eval_corpus as v1
    pages = v1.real_pages(str(Path(__file__).resolve().parents[3]))
    cases = corpus_v2.plan(7, pages, counts={"dev": 50, "heldout": 10})
    dev = [c for c in cases if c["split"] == "dev"]
    held = [c for c in cases if c["split"] == "heldout"]
    assert (len(dev), len(held)) == (50, 10)
    assert not {c["file"] for c in dev} & {c["file"] for c in held}
    assert len({c["kind"] for c in dev}) >= 6
