"""Real requests / failed runs -> pending-approval eval drafts: PII removed, pinned base, red-on-base green-on-fix, distribution vs corpus."""
import json
import subprocess

import pytest

from evaluation import eval_corpus
from evaluation import real_request_cases as rrc

SHA = "a" * 40
BASE = "<html><body>\n<p>Chu cu</p>\n</body></html>\n"


def request(rid="r1", **over):
    rec = {"id": rid, "source": {"kind": "request", "ref": "synthetic"}, "title": "Doi chu", "detail": "Doi chu cu thanh chu moi",
           "base_sha": SHA, "file": "public/a.html",
           "spec": [{"type": "replace_text", "facts": {"old": "Chu cu", "new": "Chu moi", "tag": "p"}}],
           "gold": {"edits": [{"search": ">Chu cu</p>", "replace": ">Chu moi</p>"}]}}
    rec.update(over)
    return rec


def read_base(case):
    return BASE


def build(recs, **kw):
    return rrc.build_drafts(recs, read_base, **kw)


@pytest.mark.parametrize("text,gone", [
    ("lien he nguyen.van.a@gmail.com nhe", "nguyen.van.a@gmail.com"),
    ("goi 0912345678 hoac +84987654321", "0912345678"),
    ("goi 0912345678 hoac +84987654321", "+84987654321"),
    ("so can cuoc 012345678901", "012345678901"),
    ("em la Nguyễn Văn An, lop 12A", "Nguyễn Văn An"),
    ("nho ban Trần Thị Bích Ngọc sua giup", "Trần Thị Bích Ngọc"),
    ("em tên là Lê Minh nhờ sửa", "Lê Minh"),
    ("MSSV: 20201234 bi loi", "20201234"),
    ("ma sinh vien B20DCCN123 bi loi", "B20DCCN123"),
    ("student id 12345678 here", "12345678"),
])
def test_pii_is_removed(text, gone):
    assert gone not in rrc.redact_pii(text)


def test_non_pii_text_is_kept():
    text = "Doi mau nut Dang nhap sang xanh dam o trang 3"
    assert rrc.redact_pii(text) == text


def test_draft_is_pending_approval_with_pinned_base_checks_and_clean_text():
    detail = "Em la Nguyễn Văn An, MSSV: 20201234, email an@gmail.com, sdt 0912345678: doi chu cu thanh chu moi"
    out = build([request(detail=detail)])
    (draft,) = out["drafts"]
    assert draft["status"] == "pending_approval" and draft["base_sha"] == SHA and "approved_by" not in draft
    assert draft["behaviour"] and draft["split"] in ("dev", "heldout")
    blob = json.dumps(draft, ensure_ascii=False)
    for leak in ("Nguyễn Văn An", "20201234", "an@gmail.com", "0912345678"):
        assert leak not in blob
    assert draft["id"].startswith("real-")


def test_same_request_same_id_and_pii_variant_dedupes():
    a = build([request(detail="sdt 0912345678 doi chu")])["drafts"]
    b = build([request(detail="sdt 0987654321 doi chu"), request(detail="sdt 0911111222 doi chu")])["drafts"]
    assert a[0]["id"] == b[0]["id"] and len(b) == 1


def test_unpinned_or_missing_base_is_dropped():
    out = build([request("r1", base_sha="main"), request("r2", base_sha=None)])
    assert out["drafts"] == [] and {d["reason"] for d in out["dropped"]} == {"base_sha must be a pinned 40-hex commit"}


def test_check_green_on_base_or_red_on_fix_is_dropped():
    green = request("g", gold={"edits": [{"search": ">Chu cu</p>", "replace": ">Chu cu</p>"}]},
                    spec=[{"type": "replace_text", "facts": {"old": "Khong co", "new": "Chu cu", "tag": "p"}}])
    red = request("r", gold={"edits": [{"search": ">Chu cu</p>", "replace": ">Khac</p>"}]})
    out = build([green, red])
    assert {d["id"]: d["reason"] for d in out["dropped"]} == {"g": "check green on base", "r": "check red on fix"}


def test_request_without_fix_is_dropped_but_counted_in_real_distribution():
    out = build([request("a"), request("b", gold=None, spec=None, kind="css_color")])
    assert [d["id"] for d in out["dropped"]] == ["b"] and out["dropped"][0]["reason"] == "no fix to check"
    assert out["real_kinds"] == {"replace_text": 1, "css_color": 1}


def test_pii_inside_the_fix_drops_the_case():
    leaky = request(gold={"edits": [{"search": ">Chu cu</p>", "replace": ">lien he 0912345678</p>"}]},
                    spec=[{"type": "replace_text", "facts": {"old": "Chu cu", "new": "lien he 0912345678", "tag": "p"}}])
    assert build([leaky])["dropped"][0]["reason"] == "pii in fix text"


def test_dom_check_without_probe_is_dropped_not_guessed():
    css = request(spec=[{"type": "css_color", "facts": {"selector": "body", "old": "#000", "new": "#1d4ed8"}}],
                  gold={"edits": [{"search": "<body>", "replace": '<body style="color:#1d4ed8">'}]})
    assert build([css])["dropped"][0]["reason"].startswith("unrunnable")


def test_proposed_split_follows_corpus_heldout_types():
    page = request("p", file="public/moi.html", spec=[{"type": "new_page", "facts": {"title": "T", "body": "Than", "href": "/a.html", "label": "L"}}],
                   gold={"code": "<html><head><title>T</title></head><body><h1>T</h1><p>Than</p><a href=\"/a.html\">L</a></body></html>"})
    out = rrc.build_drafts([page, request("r")], lambda c: None if c["file"] == "public/moi.html" else BASE)
    assert {d["kind"]: d["split"] for d in out["drafts"]} == {"new_page": "heldout", "replace_text": "dev"}
    assert "new_page" in eval_corpus.HELDOUT_TYPES


def test_write_refuses_vault_path_and_never_duplicates(tmp_path):
    drafts = build([request()])["drafts"]
    with pytest.raises(ValueError):
        rrc.write_drafts(drafts, tmp_path / "heldout" / "d.jsonl")
    out = tmp_path / "d.jsonl"
    assert rrc.write_drafts(drafts, out) == 1 and rrc.write_drafts(drafts, out) == 0


def test_approve_marks_one_case_and_refuses_edited_content(tmp_path):
    drafts = build([request("a"), request("b", detail="khac han")])["drafts"]
    out = tmp_path / "d.jsonl"
    rrc.write_drafts(drafts, out)
    rrc.approve(out, drafts[0]["id"], "owner")
    rows = {r["id"]: r for r in map(json.loads, out.read_text(encoding="utf-8").splitlines())}
    assert rows[drafts[0]["id"]]["status"] == "approved" and rows[drafts[0]["id"]]["approved_by"] == "owner"
    assert rows[drafts[1]["id"]]["status"] == "pending_approval"
    rows[drafts[1]["id"]]["detail"] = "da sua tay"
    out.write_text("\n".join(json.dumps(r) for r in rows.values()) + "\n", encoding="utf-8")
    with pytest.raises(ValueError):
        rrc.approve(out, drafts[1]["id"], "owner")
    with pytest.raises(KeyError):
        rrc.approve(out, "nope", "owner")


def test_publish_takes_only_approved_dev_cases_into_a_new_hashed_version(tmp_path):
    drafts = build([request("a"), request("b", detail="khac han"), request("c", detail="lai khac")])["drafts"]
    out = tmp_path / "d.jsonl"
    rrc.write_drafts(drafts, out)
    rrc.approve(out, drafts[0]["id"], "owner")
    rrc.approve(out, drafts[1]["id"], "owner")
    first = rrc.publish(out, tmp_path)
    assert first["cases"] == sorted([drafts[0]["id"], drafts[1]["id"]]) and first["version"] in first["dir"]
    cases = json.loads((tmp_path / "corpus" / f"real-{first['version']}" / "cases.json").read_text(encoding="utf-8"))
    assert {c["id"] for c in cases} == set(first["cases"]) and all(c["status"] == "approved" for c in cases)
    assert rrc.publish(out, tmp_path)["version"] == first["version"]
    rrc.approve(out, drafts[2]["id"], "owner")
    assert rrc.publish(out, tmp_path)["version"] != first["version"]


def test_compare_flags_kinds_where_corpus_and_real_shares_differ():
    rows = rrc.compare({"replace_text": 8, "css_color": 2}, {"replace_text": 3, "css_color": 3, "new_page": 4}, threshold=0.1)
    by = {r["kind"]: r for r in rows}
    assert by["new_page"]["corpus"] == 0 and by["new_page"]["real"] == 0.4 and by["new_page"]["gap"]
    assert by["replace_text"]["gap"] and by["replace_text"]["corpus"] == 0.8
    assert not rrc.compare({"a": 1}, {"a": 5}, threshold=0.1)[0]["gap"]


def test_corpus_kinds_reads_dev_cases_and_refuses_vault_path(tmp_path):
    f = tmp_path / "cases.json"
    f.write_text(json.dumps([{"kind": "replace_text"}, {"kind": "replace_text"}, {"kind": "css_color"}]), encoding="utf-8")
    assert rrc.corpus_kinds(f) == {"replace_text": 2, "css_color": 1}
    with pytest.raises(ValueError):
        rrc.corpus_kinds(tmp_path / "heldout" / "cases.json")


def test_cli_build_then_approve(tmp_path):
    repo = tmp_path / "repo"
    (repo / "public").mkdir(parents=True)
    (repo / "public" / "a.html").write_text(BASE, encoding="utf-8")

    def git(*a):
        return subprocess.run(["git", *a], cwd=repo, check=True, capture_output=True, text=True).stdout.strip()
    git("init", "-q")
    git("add", ".")
    git("-c", "user.name=t", "-c", "user.email=t@t.invalid", "commit", "-qm", "x")
    sha = git("rev-parse", "HEAD")
    req = tmp_path / "req.jsonl"
    req.write_text(json.dumps(request(base_sha=sha)) + "\n", encoding="utf-8")
    drafts, report = tmp_path / "d.jsonl", tmp_path / "r.json"
    assert rrc.main(["build", "--requests", str(req), "--source", str(repo), "--out", str(drafts), "--report", str(report)]) == 0
    assert json.loads(report.read_text(encoding="utf-8"))["drafts"] == 1
    cid = json.loads(drafts.read_text(encoding="utf-8").splitlines()[0])["id"]
    assert rrc.main(["approve", "--drafts", str(drafts), "--id", cid, "--by", "owner"]) == 0
