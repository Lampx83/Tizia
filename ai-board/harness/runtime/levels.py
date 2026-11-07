"""Mức quyền của một path: surface < protected < core, cộng vùng AI Board (self) luôn chặn.

Mức suy TỪ PATH + catalog capability, không bao giờ từ nhãn model tự khai: path lạ =
core (deny tới khi có người khai báo). Elevation là quyền MỘT LẦN (theo plan/revision)
cho worker/plan chạm mức trên surface; admin duyệt qua board rồi server gắn payload
`elevation` vào context của request/plan. File chạm nhiều mức (import, script/verify)
lấy mức cao nhất — đặt file trong _ai-generated không hạ được mức của thứ nó chạm.
"""
from __future__ import annotations

import hashlib
import json
import posixpath
import re

import path_policy

SURFACE = "surface"
PROTECTED = "protected"
CORE = "core"
SELF = "self"
RANK = {SURFACE: 0, PROTECTED: 1, CORE: 2, SELF: 3}

WHY = {
    SURFACE: "vùng surface (public/ hoặc plugin _ai-generated)",
    PROTECTED: "vùng protected (server/contexts ngoài _ai-generated, nội dung)",
    CORE: "vùng core (db/auth/migration/cấu hình hệ thống hoặc path chưa khai báo)",
    SELF: "vùng AI Board tự sửa — luôn chặn, elevation không mở",
}

# AI Board tự sửa chính mình: khớp deny_paths trong guard-lexicon.json, mọi người đều bị chặn.
_SELF = tuple(re.compile(p, re.I) for p in (
    r"^ai-board/", r"^server/ai-board/", r"^server/contexts/ai-board-[^/]*/",
    r"^public/js/ai-board-", r"^public/[^/]*ai-board", r"^public/[^/]*admin-request",
))
# Plugin AI sinh: vùng surface được khai báo, kể cả migration additive của chính plugin đó.
_GENERATED = "server/contexts/_ai-generated/"
# Test của repo: code kiểm chứng, không có quyền chạy production — khai báo surface để plan
# thêm/sửa test mà không phải xin elevation cho từng bước.
_TEST = tuple(re.compile(p, re.I) for p in (r"^tests?/",))
# Hạ tầng: db.js, auth/session, migration DB, cấu hình hệ thống. Migration trong _ai-generated
# đã khớp _GENERATED ở trên nên vẫn là surface — đó là route DB duy nhất dành cho plugin sinh.
_CORE = tuple(re.compile(p, re.I) for p in (
    r"^server/db(\.[a-z]+)?$", r"^server/db/",
    r"^server/(auth|session)(\.[a-z]+)?$", r"^server/(auth|session)/",
    r"^server/contexts/(auth|session)/",
    r"^server/migrations?/", r"^migrations?/", r"^db/migrations?/", r"^sql/migrations?/", r"\.sql$",
    r"^server/(config|settings)(\.[a-z]+)?$", r"^server/(index|app|server)\.js$",
    r"^server/contexts/(registry|index)\.js$",
    r"^(package(-lock)?\.json|tsconfig[^/]*\.json)$",
    r"^(docker-compose[^/]*|Dockerfile[^/]*|\.dockerignore|\.gitignore)$",
    r"^\.env", r"^\.github/", r"^\.claude/", r"^\.vscode/", r"^\.husky/",
))
# Quyền nội dung: context có sẵn (không sinh ra) + thư mục nội dung.
_PROTECTED = tuple(re.compile(p, re.I) for p in (r"^server/contexts/", r"^server/content/", r"^content/"))
# Script/verify target: chỉ path khớp một mục catalog mới tính (test/ đã là surface nên
# `node --test test/x.test.js` không đẩy plan lên mức cao hơn).
_REF = re.compile(r"(?<![\w./-])((?:public|server|content|db|migrations?|scripts|tools|ai-board|test|tests)"
                  r"/[\w./-]+)(?![\w-])")
# Import tương đối ('./x.js', '../y.js') — path nội bộ duy nhất cần suy mức.
_IMPORT_SPEC = re.compile(r"""(?:from\s+|import\(\s*|require\(\s*)['"]([^'"]+)['"]""")
_CONTEXT_ROOT = re.compile(r"(?:^|.*/)contexts/([^/]+)/")

CONTEXT_KEYS = ("elevation", "approved_elevation", "elevations", "elevation_required")
APPROVED_STATUS = frozenset({"approved", "granted", "active", "ok", "elevated", "done"})
# TODO(elevation): worker.HarnessPlanner._request() mới là chỗ server gắn payload đã duyệt vào
# context; tới lúc đó chỉ request/plan/state mang sẵn khoá này mới mở được cổng.


def _classify(path) -> tuple[str, bool]:
    """(mức, đã khai báo?) của path; declared=False là path rơi vào nhánh 'lạ = core'."""
    normalized = path_policy.normalize(path)
    if normalized is None:
        return CORE, False
    if any(pattern.search(normalized) for pattern in _SELF):
        return SELF, True
    if normalized.startswith(_GENERATED):
        return SURFACE, True
    if any(pattern.search(normalized) for pattern in _TEST):
        return SURFACE, True
    if any(pattern.search(normalized) for pattern in _CORE):
        return CORE, True
    if normalized.startswith("public/"):
        return SURFACE, True
    if any(pattern.search(normalized) for pattern in _PROTECTED):
        return PROTECTED, True
    return CORE, False


def level_of(path) -> str:
    """Mức của path theo catalog; path lạ hoặc không chuẩn hoá được = core."""
    return _classify(path)[0]


def declared(path) -> bool:
    """Path khớp một mục catalog (không phải nhánh 'lạ = core')."""
    return _classify(path)[1]


def strictest(levels) -> str:
    """Mức cao nhất trong các mức đã cho; rỗng = surface, tên lạ = core (không tin nhãn)."""
    found = SURFACE
    for level in levels:
        name = str(level or "").strip().lower()
        if name not in RANK:
            name = CORE
        if RANK[name] > RANK[found]:
            found = name
    return found


def touch_level(path, touched=()) -> str:
    """Mức của path gộp với mọi path nó chạm (import, script): lấy mức cao nhất."""
    return strictest([level_of(path), *(level_of(item) for item in touched)])


def _context_of(path):
    """Tên context chứa path (None nếu không nằm trong contexts/<name>/)."""
    match = _CONTEXT_ROOT.search(str(path or ""))
    return match.group(1) if match else None


def import_paths(code: str, path) -> list[str]:
    """Path nội bộ (posix, đã resolve theo `path`) mà code import — bỏ package import."""
    normalized = path_policy.normalize(path)
    if normalized is None:
        return []
    base = posixpath.dirname(normalized)
    found = []
    for spec in _IMPORT_SPEC.findall(code or ""):
        if not spec.startswith('.'):
            continue
        found.append(posixpath.normpath(posixpath.join(base, spec)))
    return list(dict.fromkeys(found))


def import_levels(code: str, path) -> list[str]:
    """Mức mà import HIỆN CÓ của `path` chạm: vào context KHÁC là core (vượt ranh giới quyền),
    còn lại theo catalog. file_level dùng để elevation phải đủ mức cho cả import sẵn có."""
    here = _context_of(path)
    return [CORE if (other := _context_of(item)) and other != here else level_of(item)
            for item in import_paths(code, path)]


def source_reader(source, sha: str | None = None):
    """read(path) -> nội dung file tại `sha` (mặc định HEAD của `source`); None nếu không có.
    Không phải repo/không đọc được thì trả None để caller quay về mức suy từ path."""
    if not source:
        return None
    from repositories import repo_at_commit

    if sha is None:
        try:
            sha = repo_at_commit.resolve(source)
        except OSError:
            return None
    tree = repo_at_commit.at(source, sha)

    def read(path) -> str | None:
        try:
            blob = tree.read(path)
        except OSError:
            return None
        return None if blob is None else blob.decode("utf-8", "replace")

    return read


def file_level(path, read=None) -> str:
    """Mức của file đích: path + mức mọi import HIỆN CÓ của nó chạm.
    Vùng surface giữ surface — import cấm trong code sinh do cổng 4 chặn, elevation không mở.
    Import vào chính AI Board không biến file ngoài thành vùng self (self là file AI Board);
    mức cao nhất còn duyệt được là core."""
    level = level_of(path)
    if read is None or level == SURFACE:
        return level
    touched = [CORE if extra == SELF else extra for extra in import_levels(read(path) or "", path)]
    return strictest([level, *touched])


def script_paths(task: dict) -> list[str]:
    """Đường dẫn code nằm trong verify/acceptance của subtask, chỉ path đã khai báo."""
    texts = [task.get("verify"), task.get("acceptance")]
    found = []
    for text in texts:
        for item in (text if isinstance(text, (list, tuple)) else [text]):
            if item:
                found += [path.rstrip(".,;:") for path in _REF.findall(str(item))]
    return list(dict.fromkeys(path for path in found if declared(path)))[:8]


def task_level(task: dict) -> str:
    """Mức của 1 subtask: file + mọi script/verify target nó chạy — lấy mức cao nhất."""
    return touch_level(task.get("file"), script_paths(task))


def requirements(plan: dict, read=None) -> list[dict]:
    """[{path, level, why}] cho target trên surface; cùng path giữ mức cao nhất, bỏ mức surface.
    `read(path)` là nội dung file tại base: có thì mức target gộp cả import sẵn có (file_level)."""
    found: dict[str, dict] = {}

    def add(path, source):
        normalized = path_policy.normalize(path)
        if normalized is None:
            return
        level = file_level(normalized, read)
        if level == SURFACE:
            return
        if normalized in found and RANK[found[normalized]["level"]] >= RANK[level]:
            return
        found[normalized] = {"path": normalized, "level": level,
                             "why": f"{WHY[level]}: {source}"
                                    + ("" if level == level_of(normalized) else " (import sẵn có trong file chạm mức này)")}

    for index, task in enumerate(plan.get("subtasks") or [], start=1):
        add(str(task.get("file") or ""), f"file subtask {index}")
        for script in script_paths(task):
            add(script, f"script/verify của subtask {index}")
    return [found[path] for path in sorted(found)]


def fingerprint(plan: dict) -> str:
    """Khoá revision của plan: elevation đã duyệt chỉ dùng cho đúng revision đã duyệt."""
    body = json.dumps(plan, ensure_ascii=False, sort_keys=True, default=str)
    return hashlib.sha256(body.encode("utf-8")).hexdigest()[:16]


def summary(required) -> str:
    """Câu lý do ngắn cho payload/plan_blocked: path nào cần mức nào."""
    required = list(required)
    items = ", ".join(f"{item['level']} {item['path']}" for item in required)
    return f"elevation_required: {len(required)} target trên surface ({items})"


def signals(required) -> list[str]:
    """Dòng tín hiệu cho admin/plan_blocked: mỗi target một dòng."""
    return [f"elevation: {item['level']} {item['path']}" for item in required]


def payload(required, plan: dict | None = None) -> dict:
    """Payload gate trả về: [{path, level, why}] + paths/levels song song (worker POST thẳng
    /elevation) + lý do + revision của plan."""
    required = [dict(item) for item in required]
    return {"required": required, "paths": [item["path"] for item in required],
            "levels": [item["level"] for item in required], "reason": summary(required),
            "plan_hash": fingerprint(plan) if plan else None}


class ElevationRequired(ValueError):
    """Target protected/core chưa có elevation duyệt: gate trả elevation_required thay vì lỗi cứng."""

    def __init__(self, required, plan: dict | None = None):
        self.required = list(required)
        self.payload = payload(self.required, plan)
        super().__init__(self.payload["reason"])


def blocked_result(gate: float, required, plan: dict | None = None) -> dict:
    """Kết quả gate cho plan cần elevation: outcome + payload + signals + evidence (worker chuyển tiếp nguyên)."""
    body = payload(required, plan)
    return {"gate": gate, "blocked": True, "outcome": "elevation_required", "reason": body["reason"],
            "elevation_required": body, "elevation": body, "signals": signals(required),
            "evidence": {"why": body["reason"], "elevation": body},
            "public_message": "Kế hoạch cần quản trị viên duyệt quyền cho vùng protected/core trước khi làm tiếp."}


def _approved(item: dict) -> bool:
    """Payload/lần duyệt đã được admin duyệt chưa; thiếu cờ trạng thái thì coi là đã duyệt."""
    if item.get("approved") is False:
        return False
    for key in ("status", "state"):
        if key in item:
            return str(item[key] or "").strip().lower() in APPROVED_STATUS
    return True


def _scope_entry(item, plan_hash=None):
    """1 mục scope đã chuẩn hoá; mức không thấp hơn mức catalog của chính path đó."""
    if isinstance(item, str):
        normalized = path_policy.normalize(item)
        return {"path": normalized, "level": level_of(normalized), "plan_hash": plan_hash} if normalized else None
    if not isinstance(item, dict) or not _approved(item):
        return None
    raw = item.get("path") or item.get("file") or item.get("target")
    normalized = path_policy.normalize(raw)
    if normalized is None:
        return None
    if str(raw or "").strip().replace("\\", "/").endswith("/"):
        normalized += "/"  # scope theo thư mục: giữ dấu '/' để phủ path con
    declared_level = str(item.get("level") or item.get("tier") or "").strip().lower()
    candidates = [level_of(normalized)]
    if declared_level in RANK:
        candidates.append(declared_level)
    return {"path": normalized, "level": strictest(candidates),
            "plan_hash": item.get("plan_hash") or item.get("revision") or plan_hash}


def _raw_items(payload):
    if isinstance(payload, (list, tuple)):
        for item in payload:
            yield item
    elif isinstance(payload, dict) and _approved(payload):
        if payload.get("path") or payload.get("file") or payload.get("target"):
            yield payload
            return
        for key in (*CONTEXT_KEYS, "scope", "paths", "items", "required"):
            if key in payload:
                yield from _raw_items(payload[key])


def scope_entries(payload, plan_hash=None) -> list[dict]:
    """Chuẩn hoá payload elevation đã duyệt (dict/list/chuỗi, lồng nhau) thành [{path, level, plan_hash}]."""
    if isinstance(payload, dict):
        plan_hash = payload.get("plan_hash") or payload.get("revision") or plan_hash
    entries = []
    for item in _raw_items(payload):
        entry = _scope_entry(item, plan_hash)
        if entry:
            entries.append(entry)
    return entries


def approved_scope(request: dict | None = None, state: dict | None = None, plan: dict | None = None) -> list[dict]:
    """Elevation đã duyệt đọc từ context: request/plan/state, các khoá CONTEXT_KEYS."""
    entries = []
    for source in (request, plan, state):
        if not isinstance(source, dict):
            continue
        for key in CONTEXT_KEYS:
            if key in source:
                entries += scope_entries(source[key])
    if isinstance(state, dict) and isinstance(state.get("request"), dict):
        entries += approved_scope(state["request"])
    return entries


def covers(entry: dict, path, level, plan_hash=None) -> bool:
    """Entry phủ path (khớp đúng, hoặc thư mục khi entry kết thúc bằng '/') ở mức >= level, cùng revision."""
    if entry.get("plan_hash") and plan_hash and entry["plan_hash"] != plan_hash:
        return False
    normalized = path_policy.normalize(path)
    if normalized is None:
        return False
    same = entry["path"] == normalized
    under = entry["path"].endswith("/") and normalized.startswith(entry["path"])
    return (same or under) and RANK.get(entry["level"], RANK[CORE]) >= RANK.get(level, RANK[CORE])


def covered(path, level, scope, plan_hash=None) -> bool:
    """Mức surface không cần elevation; vùng AI Board không elevation nào phủ được."""
    if level == SURFACE:
        return True
    if level == SELF:
        return False
    return any(covers(entry, path, level, plan_hash) for entry in scope)


def uncovered(required, scope, plan_hash=None) -> list[dict]:
    """Requirement chưa được elevation phủ (self luôn nằm lại)."""
    return [item for item in required if not covered(item["path"], item["level"], scope, plan_hash)]


def write_check(path, scope=(), plan_hash=None) -> dict:
    """{allow, level, reason}: self luôn chặn; trên surface giữ path_policy; trên protected/core
    chỉ mở khi elevation đã duyệt phủ đúng path/mức."""
    normalized = path_policy.normalize(path)
    if normalized is None:
        return {"allow": False, "level": CORE, "reason": "path không hợp lệ"}
    level = level_of(normalized)
    if level == SELF:
        return {"allow": False, "level": level, "reason": f"{normalized} thuộc vùng AI Board — luôn chặn"}
    if level == SURFACE:
        denied = path_policy.check(normalized, "write")
        return {"allow": denied["allow"], "level": level, "reason": denied["reason"]}
    if covered(normalized, level, list(scope), plan_hash):
        return {"allow": True, "level": level, "reason": ""}
    return {"allow": False, "level": level, "reason": f"{normalized} cần elevation admin cho mức {level}"}
