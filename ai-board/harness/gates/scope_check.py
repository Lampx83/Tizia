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

from runtime import levels

ROOT = Path(__file__).resolve().parents[3]
CAPABILITIES_JS = ROOT / "server" / "contexts" / "capabilities.js"

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
    files = [posixpath.normpath(str(task.get('file', '')).replace('\\', '/'))
             for task in plan.get('subtasks') or []]

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


def run(state: dict, request: dict | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại, catalog snapshot
    và elevation đã duyệt (request/state) để mở đúng capability protected/core."""
    plan = state.get("plan")
    if not plan:
        return {"gate": 2, "blocked": True, "reason": "không có plan từ cổng 1"}
    scope = levels.approved_scope(request, state, plan)
    return {"gate": 2, **check(plan, catalog=state.get('catalog'), scope=scope,
                               plan_hash=levels.fingerprint(plan))}
