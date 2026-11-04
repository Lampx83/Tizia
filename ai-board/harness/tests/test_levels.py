"""Mức path + payload elevation: thuần, không model, không DB. Mức luôn từ path + catalog."""
import pytest

from runtime import levels


@pytest.mark.parametrize("path,expected", [
    ("server/db.js", "core"),                                        # db
    ("server/contexts/content/x.js", "protected"),                   # context có sẵn
    ("server/contexts/_ai-generated/faq/index.js", "surface"),       # plugin AI sinh
    ("server/contexts/_ai-generated/faq/deep/nested.js", "surface"),
    ("server/contexts/content/deep/new.js", "protected"),            # file mới dưới thư mục protected
    ("server/contexts/content/", "protected"),                       # chính thư mục protected
    ("server/migrations/001-add-column.sql", "core"),                # migration DB
    ("server/contexts/_ai-generated/gallery/migrations/001.sql", "surface"),  # migration của plugin sinh
    ("server/auth/session.js", "core"),
    ("server/index.js", "core"),                                     # cấu hình/hạ tầng
    ("public/index.html", "surface"),
    ("test/so-tay-git.test.js", "surface"),                          # test của repo: code kiểm chứng
    ("weird/unlisted/path.txt", "core"),                             # chưa khai báo = core
    ("server/contexts/identity/auth.js", "protected"),
    ("ai-board/worker.py", "self"),                                  # AI Board tự sửa: luôn chặn
    ("server/ai-board/store.js", "self"),
    ("public/../server/db.js", "core"),                              # path không chuẩn hoá được
    ("", "core"),
])
def test_level_of_follows_the_catalog(path, expected):
    assert levels.level_of(path) == expected


def test_strictest_takes_the_highest_and_self_wins():
    assert levels.strictest([]) == "surface"
    assert levels.strictest(["surface", "protected"]) == "protected"
    assert levels.strictest(["protected", "core"]) == "core"
    assert levels.strictest(["core", "self"]) == "self"
    assert levels.strictest(["khong-phai-muc"]) == "core"   # nhãn lạ không được coi là surface


def test_a_file_touching_several_levels_takes_the_strictest():
    generated = "server/contexts/_ai-generated/faq/index.js"
    assert levels.touch_level(generated, ["server/contexts/content/x.js"]) == "protected"
    assert levels.touch_level(generated, ["server/db.js"]) == "core"
    assert levels.touch_level(generated) == "surface"


def _reader(files):
    return lambda path: files.get(path)


def test_a_protected_file_that_imports_core_needs_core_elevation():
    reader = _reader({"server/contexts/content/index.js":
                      "import { db } from '../../db.js';\n"})
    plan = {"subtasks": [{"file": "server/contexts/content/index.js"}]}

    assert levels.requirements(plan, reader)[0]["level"] == "core"
    # không có reader (base chưa đọc được) thì giữ mức suy từ path
    assert levels.requirements(plan)[0]["level"] == "protected"


def test_importing_another_context_also_needs_core_elevation():
    reader = _reader({"server/contexts/content/index.js": "import { requireAdmin } from '../admin/index.js';\n"})

    assert levels.file_level("server/contexts/content/index.js", reader) == "core"
    # sibling trong cùng context thì không phải ranh giới quyền
    assert levels.file_level("server/contexts/content/index.js",
                             _reader({"server/contexts/content/index.js": "import { x } from './helper.js';\n"})) == "protected"


def test_a_core_file_importing_the_ai_board_still_asks_for_core_not_self():
    # self là file AI Board; file db.js chỉ import vào AI Board nên mức duyệt được cao nhất là core
    reader = _reader({"server/db.js": "import { applyMigrations } from './ai-board/db/index.js';\n"})

    assert levels.file_level("server/db.js", reader) == "core"


def test_requirements_list_only_targets_above_surface():
    plan = {"subtasks": [
        {"file": "server/contexts/_ai-generated/faq/index.js", "verify": "node --test test/faq.test.js"},
        {"file": "server/contexts/content/index.js", "verify": "curl -s localhost:3000/api/content"},
    ]}
    found = levels.requirements(plan)
    assert found == [{"path": "server/contexts/content/index.js", "level": "protected",
                      "why": found[0]["why"]}]
    assert set(found[0]) == {"path", "level", "why"}


def test_verify_target_inherits_the_strictest_level_of_the_subtask():
    task = {"file": "public/x.html", "verify": "python server/contexts/content/build.py"}
    assert levels.task_level(task) == "protected"
    assert levels.requirements({"subtasks": [task]}) == [
        {"path": "server/contexts/content/build.py", "level": "protected",
         "why": levels.requirements({"subtasks": [task]})[0]["why"]}]
    # test/ chưa khai báo trong catalog: verify bình thường không đẩy plan lên core
    assert levels.task_level({"file": "public/x.html", "verify": "node --test test/x.test.js"}) == "surface"


def test_same_path_in_two_subtasks_keeps_the_highest_level():
    plan = {"subtasks": [{"file": "server/contexts/content/x.js"},
                         {"file": "server/db.js"}, {"file": "server/contexts/content/x.js"}]}
    assert {item["path"]: item["level"] for item in levels.requirements(plan)} == {
        "server/contexts/content/x.js": "protected", "server/db.js": "core"}


def test_approved_elevation_must_cover_the_exact_path_and_level():
    protected = [{"path": "server/contexts/content/x.js", "level": "protected", "plan_hash": None}]
    assert levels.covered("server/contexts/content/x.js", "protected", protected)
    assert not levels.covered("server/contexts/content/y.js", "protected", protected)
    assert not levels.covered("server/db.js", "core", protected)  # mức thấp hơn core

    core = [{"path": "server/db.js", "level": "core", "plan_hash": None}]
    assert levels.covered("server/db.js", "core", core)
    assert levels.covered("server/db.js", "core",
                          [{"path": "server/", "level": "core", "plan_hash": None}])  # scope thư mục


def test_a_label_cannot_lower_the_catalog_level():
    # "level": "surface" cho path protected: mức catalog vẫn thắng
    scope = levels.scope_entries({"status": "approved",
                                  "scope": [{"path": "server/contexts/content/x.js", "level": "surface"}]})
    assert scope == [{"path": "server/contexts/content/x.js", "level": "protected", "plan_hash": None}]
    assert levels.covered("server/contexts/content/x.js", "protected", scope)


def test_pending_or_rejected_elevation_does_not_cover():
    for status in ("pending", "rejected", "revoked"):
        assert levels.scope_entries({"status": status,
                                     "scope": [{"path": "server/db.js", "level": "core"}]}) == []
    assert levels.scope_entries({"approved": False, "path": "server/db.js", "level": "core"}) == []


def test_ai_board_scope_is_never_covered():
    scope = levels.scope_entries({"status": "approved",
                                  "scope": [{"path": "ai-board/worker.py", "level": "self"}]})
    assert levels.covered("ai-board/worker.py", "self", scope) is False
    assert levels.uncovered([{"path": "ai-board/worker.py", "level": "self", "why": "x"}], scope) != []


def test_elevation_is_one_shot_for_one_plan_revision():
    first = {"subtasks": [{"file": "server/db.js"}]}
    second = {"subtasks": [{"file": "server/db.js"}, {"file": "server/contexts/content/x.js"}]}
    scope = levels.scope_entries({"status": "approved", "plan_hash": levels.fingerprint(first),
                                  "scope": [{"path": "server/db.js", "level": "core"}]})
    assert levels.covered("server/db.js", "core", scope, levels.fingerprint(first))
    assert not levels.covered("server/db.js", "core", scope, levels.fingerprint(second))


def test_approved_scope_reads_request_plan_and_state_context():
    approved = {"status": "approved", "scope": [{"path": "server/db.js", "level": "core"}]}
    for keyword in ({"request": {"elevation": approved}},
                    {"plan": {"elevation": approved}},
                    {"state": {"elevation": approved}},
                    {"state": {"request": {"elevation": approved}}},
                    {"request": {"elevation_required": approved}}):
        scope = levels.approved_scope(**keyword)
        assert levels.covered("server/db.js", "core", scope), keyword


def test_write_check_blocks_protected_and_core_without_elevation():
    assert levels.write_check("server/db.js")["allow"] is False
    assert levels.write_check("server/contexts/content/x.js")["allow"] is False
    assert levels.write_check("public/index.html")["allow"] is True
    scope = levels.scope_entries({"status": "approved",
                                  "scope": [{"path": "server/db.js", "level": "core"}]})
    assert levels.write_check("server/db.js", scope)["allow"] is True
    assert levels.write_check("ai-board/worker.py", scope)["allow"] is False  # self luôn chặn
