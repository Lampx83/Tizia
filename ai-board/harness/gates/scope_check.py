"""Cổng 2 — Escalation Policy cứng: plan xin capability nào ngoài `surface` là
chặn ngay, không gọi model, không cần người nói "không".

Elevation đã duyệt là ngoại lệ duy nhất: capability core/protected đi qua khi
ticket mang `elevation` được admin duyệt phủ ĐÚNG path + mức của capability đó
(runtime/levels.py). Không có duyệt, path chưa phủ, hay path lệch khỏi `allow`
của capability thì vẫn chặn; vùng AI Board (`self`) không elevation nào mở.

Tên surface/core cũ đọc từ server/contexts/capabilities.js. Tên D0 mới dùng
catalog surface của snapshot server và chỉ được nhắm file trong phạm vi đã cấp.
Không import JavaScript, vì import sẽ khởi tạo database của ứng dụng.
"""
from __future__ import annotations

import re
import posixpath
from functools import lru_cache
from pathlib import Path

import path_policy
from runtime import levels, subtask_files

FULLSTACK_CAPABILITY = "context.write"

ROOT = Path(__file__).resolve().parents[3]
CAPABILITIES_JS = ROOT / "server" / "contexts" / "capabilities.js"
POLICY_JS = ROOT / "server" / "ai-board" / "security" / "policy.js"
_POLICY_ENTRY = re.compile(r"^  '?([\w.]+)'?: capability\('(\w+)',\s*\[[^\]]*\],\s*'([^']*)'", re.M)
FULLSTACK_MEANING = "[surface] Edits an existing mounted server context (requester fullstack zone)."

# ponytail: regex bám vào format `export const <tier> = xxx({` ... `});` với key
# cấp 1 thụt đúng 2 space. Đổi format file JS là test
# test_capability_names_parsed_from_real_capabilities_js đỏ ngay — đó là chốt.
_BLOCK = r"^export const {tier} = (?:deepFreeze|Object\.freeze)\(\{{\n(.*?)^\}}\);"
# `db,` (shorthand) lẫn `features: {` (key: value) đều là key cấp 1.
_TOP_KEY = re.compile(r"^  (\w+)[:,]", re.M)


@lru_cache(maxsize=None)
def load_capability_names(path: Path = CAPABILITIES_JS) -> dict[str, frozenset[str]]:
    """Tên key cấp 1 của 2 object surface/core. Cache theo path — file tĩnh trong 1 lần chạy."""
    src = path.read_text(encoding="utf-8")
    out = {}
    for tier in ("surface", "core"):
        m = re.search(_BLOCK.format(tier=tier), src, re.S | re.M)
        if not m:
            raise ValueError(f"không tìm thấy `export const {tier}` trong {path}")
        out[tier] = frozenset(_TOP_KEY.findall(m.group(1)))
    return out


@lru_cache(maxsize=None)
def catalog_meanings(path: Path = POLICY_JS) -> dict[str, str]:
    """Static CAPABILITY_POLICY names -> one-line meaning, parsed from policy.js."""
    return {m[1]: f"[{m[2]}] {m[3]}" for m in _POLICY_ENTRY.finditer(path.read_text(encoding="utf-8"))}


def valid_capabilities() -> dict[str, str]:
    """Every name gate 2 can accept -> meaning: catalog, capabilities.js surface, context.write when the zone is on."""
    out = dict(catalog_meanings())
    for name in sorted(load_capability_names()["surface"]):
        out.setdefault(name, "[surface] Helper from server/contexts/capabilities.js.")
    if path_policy.fullstack_on():
        out[FULLSTACK_CAPABILITY] = FULLSTACK_MEANING
    return out


def capability_enum() -> str:
    """Prompt block: allowed capability names, one meaning each."""
    rows = "\n".join(f"- {name}: {meaning}" for name, meaning in valid_capabilities().items())
    return f'\nCAPABILITY NAMES (enum: "capabilities" may hold only these exact strings):\n{rows}\n'


# State/request keys this gate reads (LF/125): plan + catalog từ state, elevation từ cả hai.
INPUTS = ("plan", "catalog", "elevation")


def _under(path: str, prefixes) -> bool:
    """Path khớp chính xác hoặc nằm trong một prefix thư mục."""
    return any(path == str(prefix) or path.startswith(str(prefix)) for prefix in prefixes)


def _elevated(cap: str, file: str, names: dict[str, frozenset[str]], catalog: dict | None,
              scope, plan_hash: str | None) -> bool:
    """`file` mở được cho capability `cap` bằng elevation đã duyệt: cap phải là core/protected
    của catalog (hoặc tên core cũ), file phải nằm trong `allow`/ngoài `deny` của cap và được
    elevation phủ ở mức >= mức catalog. File surface hoặc vùng AI Board thì không."""
    policy = (catalog or {}).get(cap) or {}
    tier = str(policy.get("tier") or "").strip().lower()
    if cap not in names["core"] and tier not in (levels.PROTECTED, levels.CORE):
        return False  # tên lạ model bịa ra: không có gì để duyệt
    allow = policy.get("allow") or []
    if allow and not _under(file, allow):
        return False
    if _under(file, policy.get("deny") or []):
        return False
    level = levels.level_of(file)
    if level not in (levels.PROTECTED, levels.CORE):
        return False  # capability core không mở file surface; surface tự đi qua nhánh allowed()
    if tier in levels.RANK and levels.RANK[tier] > levels.RANK[level]:
        level = tier
    return levels.covered(file, level, list(scope), plan_hash)


def check(plan: dict, names: dict[str, frozenset[str]] | None = None, catalog: dict | None = None,
          scope=(), plan_hash: str | None = None) -> dict:
    """{blocked, reason}. Allowlist: mọi thứ không nằm trong surface đều chặn —
    core, raw ws/sse, hay tên lạ model bịa ra, cùng một kết cục, trừ khi có
    elevation đã duyệt phủ đúng path/mức của capability.

    Chỉ soi `capabilities` model TỰ khai — plan bỏ trống key này thì qua. Chốt
    thật là cổng 4 lint import trong code sinh ra; cổng này là
    lớp rẻ chặn sớm, không phải lớp duy nhất."""
    names = names or load_capability_names()
    scope = list(scope)
    files = [posixpath.normpath(path.replace('\\', '/'))
             for task in plan.get('subtasks') or [] for path in subtask_files.files_of(task)]

    def allowed(file, policy):
        return (policy.get('tier') == 'surface'
                and any(file.startswith(prefix) for prefix in policy.get('allow', []))
                and not any(file.startswith(prefix) for prefix in policy.get('deny', [])))

    def elevated(cap, file):
        return _elevated(cap, file, names, catalog, scope, plan_hash)

    caps = [cap for cap in plan.get("capabilities") or []]
    for cap in caps:
        if not isinstance(cap, str):
            return {"blocked": True, "reason": f"capability không phải chuỗi: {cap!r}"}
        if cap in names["surface"]:
            continue
        policy = (catalog or {}).get(cap, {})
        if any(allowed(file, policy) for file in files):
            continue
        if any(elevated(cap, file) for file in files):
            continue
        tier = "thuộc core" if cap in names["core"] else "không có trong surface"
        return {"blocked": True, "reason": f"capability '{cap}' {tier} — plugin AI sinh không được "
                                           f"cấp (thiếu elevation admin cho đúng path/mức)"}
    if any(cap not in names['surface'] for cap in caps):
        for file in files:
            if any(allowed(file, (catalog or {}).get(cap, {})) for cap in caps):
                continue
            if any(elevated(cap, file) for cap in caps if cap not in names['surface']):
                continue
            return {'blocked': True, 'reason': f"file '{file}' ngoài surface catalog đã cấp"}
    return {"blocked": False, "reason": None}


def _zone_capability(file: str) -> str | None:
    """Capability of a file the fullstack zone opens, from its path alone; None outside the zone."""
    if file.startswith(path_policy.GENERATED_ROOT):
        return "generated.context"
    if file.startswith("public/") and path_policy.may_edit(file):
        return "public.ui"
    if path_policy.mounted_context(file) and path_policy.may_edit(file):
        return FULLSTACK_CAPABILITY
    return None


def path_capability(file: str) -> str | None:
    """Catalog capability a path needs, editable zone or not; None outside every capability."""
    if file.startswith(path_policy.GENERATED_ROOT):
        return "generated.context"
    if file.startswith("public/"):
        return "public.ui"
    if path_policy.mounted_context(file):
        name = file.split("/")[2]
        if name in ("content", "integration"):
            return f"{name}.write"
        return FULLSTACK_CAPABILITY if path_policy.may_edit(file) else "core.server"
    return None


def expected_capability(plan: dict) -> str | None:
    """Capability every planned file maps to, when the plan declares another one; else None."""
    files = [posixpath.normpath(path.replace('\\', '/'))
             for task in plan.get('subtasks') or [] for path in subtask_files.files_of(task)]
    caps = {path_capability(file) for file in files}
    declared = [cap for cap in plan.get("capabilities") or [] if isinstance(cap, str)]
    if len(caps) != 1 or None in caps or not declared or set(declared) == caps:
        return None
    return caps.pop()


def derive_capabilities(plan: dict) -> tuple[list[str], list[str]]:
    """Flag on: (capabilities from the plan's files, model names dropped). A file outside the zone keeps the model's names
    so this gate still judges it."""
    files = [posixpath.normpath(path.replace('\\', '/'))
             for task in plan.get('subtasks') or [] for path in subtask_files.files_of(task)]
    model = [cap for cap in plan.get("capabilities") or [] if isinstance(cap, str)]
    derived = [cap for file in files if (cap := _zone_capability(file))]
    if any(_zone_capability(file) is None for file in files):
        derived += model
    caps = list(dict.fromkeys(derived))
    return caps, [cap for cap in dict.fromkeys(model) if cap not in caps]


def run(state: dict, request: dict | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại, catalog snapshot
    và elevation đã duyệt (request/state) để mở đúng capability protected/core.
    Cờ requester_fullstack_db: capability của plan suy từ file (ghi đè plan), tên model khai thừa bị bỏ, ghi vào kết quả."""
    plan = state.get("plan")
    if not plan:
        return {"gate": 2, "blocked": True, "reason": "không có plan từ cổng 1"}
    dropped = []
    if path_policy.fullstack_on():
        plan["capabilities"], dropped = derive_capabilities(plan)
    scope = levels.approved_scope(request, state, plan)
    return {"gate": 2, **check(plan, catalog=state.get('catalog'), scope=scope,
                               plan_hash=levels.fingerprint(plan)),
            **({"capabilities_dropped": dropped} if dropped else {})}
