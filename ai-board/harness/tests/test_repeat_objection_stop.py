from runtime.objection_repeat import repeated, signature


def stopped(reason, gate=2.5):
    return {"gate": gate, "result": {"reason": reason}}


SAME = "plan_ungrounded: plan sửa public/trang.html không có dẫn chứng"


def test_two_identical_signatures_stop():
    assert repeated([stopped(SAME), stopped(SAME)], 2)


def test_different_reason_class_continues():
    assert not repeated([stopped(SAME), stopped("plan không hợp lệ: x")], 2)


def test_different_cited_paths_continue():
    assert not repeated([stopped(SAME), stopped("plan_ungrounded: plan sửa public/khac.html")], 2)


def test_wording_change_with_same_structure_still_stops():
    other = "plan_ungrounded: plan sửa public/trang.html, dẫn chứng yếu"
    assert signature(stopped(SAME)) == signature(stopped(other))
    assert repeated([stopped(SAME), stopped(other)], 2)


def test_single_round_never_stops():
    assert not repeated([stopped(SAME)], 2)
