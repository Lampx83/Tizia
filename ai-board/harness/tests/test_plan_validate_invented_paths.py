from gates import plan_validate as pv

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
