from gates import plan_validate as pv

FEATURE = {"type": "feature"}
PLAN = {"subtasks": [{"file": "public/faq-co-so-du-lieu.html"}, {"file": "public/js/features/faq-co-so-du-lieu/index.js"}]}


def cited(reason, files=None):
    return pv.invented_paths({"reason": reason}, PLAN, files or {})


def test_directory_style_citation_without_extension_is_invented():
    reason = ("REPO DATA đã có chức năng tương tự: public/js/features/them-trang-faq-mon-co-so-du-lieu/index... "
              "nên không tạo trang mới")
    assert cited(reason) == ["public/js/features/them-trang-faq-mon-co-so-du-lieu/index"]


def test_citation_of_a_file_in_repo_data_is_not_invented():
    reason = "public/js/school-explore.js đã xử lý việc này"
    assert cited(reason, {"public/js/school-explore.js": "x"}) == []


def test_citation_of_the_planned_file_is_not_invented():
    assert cited("public/js/features/faq-co-so-du-lieu/index.js đã đúng") == []


def test_no_path_in_reason_is_not_invented():
    assert cited("thiếu hành vi trước/sau") == []


def test_new_file_only_plan_objecting_without_repo_path_is_not_blocked():
    validation = {"reason": "REPO DATA không có file nào tương ứng để trích dẫn, plan không tuân thủ quy ước Static page",
                  "grounded": False}
    assert pv.new_file_only_objection(validation, PLAN, {"public/js/school-explore.js": "x"}, FEATURE)


def test_objection_naming_an_existing_repo_file_still_blocks():
    validation = {"reason": "public/js/school-explore.js đã có chức năng này", "grounded": False}
    assert not pv.new_file_only_objection(validation, PLAN, {"public/js/school-explore.js": "x"}, FEATURE)


def test_plan_editing_an_existing_file_still_blocks_on_objection():
    plan = {"subtasks": [{"file": "public/js/school-explore.js"}]}
    validation = {"reason": "không có file tương ứng", "grounded": False}
    assert not pv.new_file_only_objection(validation, plan, {"public/js/school-explore.js": "x"}, FEATURE)


def test_edit_request_is_not_a_new_file_objection():
    validation = {"reason": "không có file tương ứng", "grounded": False}
    assert not pv.new_file_only_objection(validation, PLAN, {}, {"type": "bug"})
