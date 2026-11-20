"""Replace requests: one element, one page; gate 4 reads the exact new literal; an unquoted literal after a colon is read."""
import pytest

from gates import best_match, static_check
from test_code_index import _commit, _git
from verification import functional

pytestmark = pytest.mark.usefixtures('high_target_confidence')

OLD, NEW = "🌲 Rừng Chữ", "Ôn bài mỗi ngày."
HOME, SIBLING, SCRIPT = "public/vuon-hoa.html", "public/khu-vuc.html", "public/js/menu.js"
LINK = f'<a class="back" href="/rung.html">{OLD}</a>\n'


def _repo(tmp_path):
    src = tmp_path / "src"
    src.mkdir()
    _git(src, "init", "-q")
    _git(src, "config", "user.email", "t@t")
    _git(src, "config", "user.name", "t")
    _commit(src, {HOME: f"<title>Vườn hoa</title>\n<h1>Vườn hoa</h1>\n{LINK}",
                  SIBLING: f"<title>Khu vực</title>\n<h1>Khu vực</h1>\n{LINK}",
                  SCRIPT: f"const MENU = [{{label: '{OLD}'}}];\n"})
    return src


def _ask(subject, body=""):
    return {"id": "r", "type": "other", "subject": subject, "body": body}


NAMED = _ask(f"Đổi chữ liên kết '{OLD}' thành '{NEW}'", "Trang vườn hoa có hai liên kết ở đầu trang, đổi cái thứ hai nhé.")
PAGE_LINE = _ask(f"Đổi chữ liên kết '{OLD}' thành '{NEW}'", "[Trang: Khu vực] /khu-vuc.html")
VAGUE = _ask(f"Đổi chữ liên kết '{OLD}' thành '{NEW}'", "Em muốn đổi chữ cái liên kết đó.")
EVERYWHERE = _ask(f"Đổi chữ '{OLD}' thành '{NEW}' ở mọi trang", "")


def test_several_homes_name_the_requested_page_and_forbid_other_files(tmp_path):
    reason = best_match.old_literal_refusal(NAMED, {SCRIPT}, _repo(tmp_path), "HEAD")
    assert HOME in reason and "chỉ sửa" in reason and "không đổi file khác" in reason
    assert SIBLING in reason  # the other homes are listed so the model knows what to leave alone


def test_page_line_points_at_its_page(tmp_path):
    reason = best_match.old_literal_refusal(PAGE_LINE, {HOME}, _repo(tmp_path), "HEAD")
    assert reason.count(SIBLING) >= 1 and "chỉ sửa " + SIBLING in reason


def test_plan_editing_several_homes_is_refused(tmp_path):
    src = _repo(tmp_path)
    assert best_match.old_literal_refusal(NAMED, {HOME, SIBLING}, src, "HEAD")
    assert best_match.old_literal_refusal(NAMED, {HOME}, src, "HEAD") == ""


def test_without_a_page_hint_the_model_picks_one_and_justifies(tmp_path):
    src = _repo(tmp_path)
    none_edited = best_match.old_literal_refusal(VAGUE, {"public/other.html"}, src, "HEAD")
    assert "chọn đúng một" in none_edited and "lý do" in none_edited and "không đổi file khác" in none_edited
    assert best_match.old_literal_refusal(VAGUE, {HOME, SIBLING}, src, "HEAD")
    assert best_match.old_literal_refusal(VAGUE, {SIBLING, SCRIPT}, src, "HEAD") == ""
    assert best_match.old_literal_refusal(VAGUE, {SIBLING}, src, "HEAD") == ""


def test_request_for_every_page_may_edit_every_home(tmp_path):
    assert best_match.old_literal_refusal(EVERYWHERE, {HOME, SIBLING, SCRIPT}, _repo(tmp_path), "HEAD") == ""


def _diff(path, *hunk):
    return f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1,9 +1,9 @@\n" + "".join(f"{line}\n" for line in hunk)


def _misses(text, request=NAMED):
    return static_check.literal_misses({"request_title": request["subject"], "request_detail": request["body"]}, text)


def test_new_literal_elsewhere_in_the_diff_does_not_stand_in_for_the_replacement():
    text = _diff(HOME, f"-{LINK.strip()}", '+<a class="back" href="/rung.html">Ôn bài mỗi ngày</a>',
                 '+<meta name="description" content="Hôm nay bạn đã làm tốt. Ôn bài mỗi ngày.">')
    found = _misses(text)
    assert len(found) == 1 and HOME in found[0] and NEW in found[0] and "Ôn bài mỗi ngày</a>" not in found[0].split("đang là")[0]


def test_replacement_equal_to_the_new_literal_passes_even_with_other_text_added():
    text = _diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>', "+<p>Ôn bài.</p>")
    assert _misses(text) == []


def test_every_removed_segment_holding_the_old_text_must_be_replaced():
    text = _diff(HOME, f"-{LINK.strip()}", f'-<title>{OLD}</title>',
                 f'+<a class="back" href="/rung.html">{NEW}</a>', f'+<title>{NEW.rstrip(".")}</title>')
    found = _misses(text)
    assert len(found) == 1 and "<title>" not in found[0] and NEW.rstrip(".") in found[0]


def test_old_text_removed_without_a_replacement_is_a_miss():
    assert _misses(_diff(HOME, f"-{LINK.strip()}", "+<p>khác</p>"))


def test_old_text_in_an_attribute_is_compared_as_the_whole_line():
    request = _ask(f"Đổi '{OLD}' thành '{NEW}'")
    ok = _diff(HOME, f'-<a title="{OLD}" href="/">x</a>', f'+<a title="{NEW}" href="/">x</a>')
    assert _misses(ok, request) == []
    assert _misses(ok.replace(NEW, NEW.rstrip(".")), request)


COLON_TITLE = "Đổi tiêu đề lớn đầu trang thành: Bảng tập mới nhất."
COLON_BODY = "Mình muốn dòng tiêu đề to nhất đổi thành: Bảng tập mới nhất. Mấy chỗ khác giữ nguyên nha."


def _want(title, body=""):
    return functional.text_expectation({"request_title": title, "request_detail": body})


def test_unquoted_literal_after_thanh_colon_is_read_with_its_period():
    assert _want(COLON_TITLE, COLON_BODY) == {"present": ["Bảng tập mới nhất."], "absent": []}


def test_literal_in_title_alone_and_in_detail_alone():
    assert _want(COLON_TITLE)["present"] == ["Bảng tập mới nhất."]
    assert _want("Đổi tiêu đề", COLON_BODY)["present"] == []


def test_colon_without_a_replace_verb_or_a_target_clause_is_ignored():
    assert _want("Sửa lỗi hiển thị: bảng bị lệch") == {"present": [], "absent": []}
    assert _want("Đổi giờ học thành 10:30 sáng") == {"present": [], "absent": []}


def test_title_without_final_period_does_not_gain_one_from_the_detail():
    assert _want("Đổi tiêu đề thành: Bảng tập mới nhất", COLON_BODY)["present"] == ["Bảng tập mới nhất"]


def test_gate_4_flags_the_colon_literal_shipped_without_its_period():
    state = {"request_title": COLON_TITLE, "request_detail": COLON_BODY}
    bad = _diff("public/m.html", "-<h1>Chợ bài giảng</h1>", "+<h1>Bảng tập mới nhất</h1>")
    assert static_check.literal_misses(state, bad)
    assert static_check.literal_misses(state, bad.replace("nhất</h1>", "nhất.</h1>")) == []


def test_all_pages_escape_needs_an_explicit_page_phrase(tmp_path):
    src = _repo(tmp_path)
    keep = _ask(f"Đổi chữ liên kết '{OLD}' thành '{NEW}'", "Trang vườn hoa, tab 'Tất cả' và các trang khác giữ nguyên nhé. Mới thôi.")
    assert best_match.old_literal_refusal(keep, {HOME, SIBLING}, src, "HEAD")
    assert best_match.old_literal_refusal(_ask(f"Đổi chữ '{OLD}' thành '{NEW}' ở mọi trang"), {HOME, SIBLING}, src, "HEAD") == ""
    assert best_match.old_literal_refusal(_ask(f"Đổi chữ '{OLD}' thành '{NEW}' trên tất cả các trang"), {HOME, SIBLING}, src, "HEAD") == ""


def test_user_words_outrank_the_page_line_and_folded_words_name_no_page(tmp_path):
    src = _repo(tmp_path)
    body = "[Trang: Khu vực] /khu-vuc.html\nTrang vườn hoa có hai liên kết."
    assert "chỉ sửa " + HOME in best_match.old_literal_refusal(_ask(NAMED["subject"], body), {SIBLING}, src, "HEAD")
    for body in ("Trang chủ có liên kết này", "Nền trắng có liên kết này"):
        assert "chọn đúng một" in best_match.old_literal_refusal(_ask(NAMED["subject"], body), {SIBLING, HOME}, src, "HEAD")


def test_gate_4_judges_several_homes_with_one_miss():
    text = _diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>') + \
        _diff(SIBLING, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>')
    found = _misses(text)
    assert len(found) == 1 and "hoàn tác" in found[0] and HOME in found[0] and SIBLING in found[0]
    assert len(_misses(text, EVERYWHERE)) == 0


PAIR_FAR = _ask(f"Đổi chữ '{OLD}' trên trang vườn hoa thành '{NEW}'")


def test_pair_with_words_before_thanh_is_still_a_pair():
    kept = _diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">→ {NEW}</a>')
    assert _misses(kept, PAIR_FAR)
    assert _misses(_diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>'), PAIR_FAR) == []


def _colon(title, body=""):
    return _want(title, body)["present"]


def test_colon_replace_needs_an_added_segment_equal_to_the_literal(tmp_path):
    req = _ask(COLON_TITLE, COLON_BODY)
    old = "-<h1>Chợ bài giảng</h1>"
    good = _diff("public/m.html", old, "+<h1>Bảng tập mới nhất.</h1>")
    assert _misses(good, req) == []
    for added in ("<h1>📚 Bảng tập mới nhất.</h1>", "<h1>Bảng tập mới nhất. Mới!</h1>", "<h1>Bảng tập mới nhất</h1>\n+<!-- Bảng tập mới nhất. -->"):
        assert _misses(_diff("public/m.html", old, "+" + added), req), added
    page = tmp_path / "public"
    page.mkdir()
    (page / "m.html").write_text("<h1>Bảng tập mới nhất</h1>\n<p>Bảng tập mới nhất.</p>\n", encoding="utf-8")
    assert static_check.literal_misses({"request_title": req["subject"], "request_detail": req["body"]},
                                       _diff("public/m.html", old, "+<h1>Bảng tập mới nhất</h1>"), tmp_path)
    assert _misses(_diff("public/m.html", old, '+<a title="Bảng tập mới nhất.">x</a>'), req) == []


def test_colon_reader_returns_nothing_when_unsure():
    none = []
    assert _colon("Đổi tiêu đề thành: Bảng tập mới nhất nha.") == none
    assert _colon("Đổi tiêu đề thành: Bảng tập mới nhất.", "Đổi thành: Bảng tập mới nhất nhé, cảm ơn.") == ["Bảng tập mới nhất."]
    assert _colon("Đổi tiêu đề", "Đổi thành: Bảng mới. cảm ơn nha") == none
    assert _colon("Đổi nút thành chữ khác, lưu ý: không đổi màu nút") == none
    assert _colon("Đổi nút bằng link: https://tizia.vn/khoa-hoc.") == none
    assert _colon("Đổi nút thành: https://tizia.vn/khoa-hoc.") == none
    assert _colon("Đổi nút thành: xanh lá #16a34a") == none
    assert _colon("Đổi màu nút thành: xanh lá") == none
    assert _colon("Đổi chữ thành: Học ngay! Miễn phí.") == none
    assert _colon("Đổi tiêu đề trang thành: Ôn tập Hóa 10. Còn nút thì để nguyên.") == none
    assert _colon("Đổi tiêu đề", "Đổi thành: Học ngay. Miễn phí cho mọi người.") == none
    assert _colon("Đổi tiêu đề", "Đổi thành: Bảng mới nhất. Mấy chỗ khác giữ nguyên nha.") == none


def test_real_words_that_look_like_particles_are_kept():
    for lit in ("Gửi đi", "Bắt đầu đi!", "Học cùng bạn với"):
        assert _colon(f"Đổi chữ nút thành: {lit}") == [lit]
    for lit in ("Cố lên nhé!", "Xin cảm ơn!", "Vâng ạ"):
        assert _colon(f"Đổi chữ nút thành: {lit}") == []
    assert _colon("Đổi chữ nhãn độ khó thành: Khó vừa.") == ["Khó vừa."]
    assert _colon("Đổi chữ nút nền tảng thành: Bắt đầu.") == ["Bắt đầu."]
    assert _colon("Đổi màu chữ thành: Xanh lá") == []


def test_colon_literal_in_js_and_json_counts():
    req = _ask(COLON_TITLE)
    for old, new in (("-  {label: 'Chợ'},", "+  {label: 'Bảng tập mới nhất.'},"), ('-  "title": "Chợ",', '+  "title": "Bảng tập mới nhất.",'),
                     ("-  html = `<h1>Chợ</h1>`;", "+  html = `<h1>Bảng tập mới nhất.</h1>`;")):
        assert _misses(_diff("public/js/a.js", old, new), req) == [], new


def test_keep_as_is_quote_is_not_a_pair():
    body = "Trang pet có hai liên kết, cái '🌲 Rừng Chữ' đổi thành 'Ôn bài mỗi ngày.', cái '← Tizia' để nguyên ạ."
    state = {"request_title": "Đổi chữ liên kết thứ hai trên trang pet", "request_detail": body}
    assert functional.replace_pairs(state) == [(OLD, NEW)]
    ok = _diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>')
    assert static_check.literal_misses(state, ok) == []
    odd = {"request_title": "Đổi chữ liên kết thứ hai trên trang pet", "request_detail": f"Cái '{OLD}' và cái '← Tizia' đổi thành chữ mới."}
    assert functional.replace_pairs(odd) == []


def test_several_places_are_not_one_file(tmp_path):
    src = _repo(tmp_path)
    for body in ("Ở trang vườn hoa và trang khu vực.", "Trên cả hai trang.", "Ở mọi nơi nhé.", "Everywhere please."):
        assert best_match.old_literal_refusal(_ask(NAMED["subject"], body), {HOME, SIBLING}, src, "HEAD") == "", body
    assert best_match.old_literal_refusal(_ask(f"Đổi tất cả chữ '{OLD}' thành '{NEW}'"), {HOME, SIBLING}, src, "HEAD") == ""
    assert best_match.old_literal_refusal(NAMED, {HOME, SCRIPT}, src, "HEAD") == ""
    conflict = _ask(NAMED["subject"], "Ở trang vườn hoa, liên kết dẫn tới khu-vuc.html.")
    assert "chỉ sửa" not in best_match.old_literal_refusal(conflict, {HOME, SIBLING}, src, "HEAD")
    assert "chỉ sửa " + SIBLING in best_match.old_literal_refusal(_ask(NAMED["subject"], "[Trang: Khu vực] /khu-vuc.html?tab=2"), {HOME}, src, "HEAD")


def test_gate_4_leaves_multi_place_requests_alone():
    text = _diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>') +         _diff(SIBLING, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>')
    assert _misses(text, _ask(NAMED["subject"], "Ở trang vườn hoa và trang khu vực.")) == []
    js = _diff(SCRIPT, f"-const MENU = [{{label: '{OLD}'}}];", f"+const MENU = [{{label: '{NEW}'}}];")
    assert _misses(_diff(HOME, f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>') + js) == []


def test_attribute_replacement_ignores_other_attributes_and_reindents():
    request = _ask(f"Đổi '{OLD}' thành '{NEW}'")
    img = _diff(HOME, f'-<img alt="{OLD}" src=a.png>', f'+<img alt="{NEW}" src=a.png loading="lazy">')
    assert _misses(img, request) == []
    sibling = _diff(HOME, f"-    {LINK.strip()}", f"+  {LINK.strip()}", f"-{LINK.strip()}", f'+<a class="back" href="/rung.html">{NEW}</a>')
    assert _misses(sibling, request) == []
    far = _diff(HOME, f"-{LINK.strip()}", "+<p>x</p>") + "@@ -40,2 +40,2 @@\n" + f'+<a class="back" href="/rung.html">{NEW}</a>\n'
    assert _misses(far, request) == []


def test_colon_reader_reads_every_pair_in_a_sentence():
    assert _colon("Đổi tiêu đề thành: A1. Và đổi nút thành: B2.") == ["A1.", "B2."]
    assert _colon("Đổi tiêu đề", "Đổi tiêu đề thành: A1 và nút thành: B2") == []
