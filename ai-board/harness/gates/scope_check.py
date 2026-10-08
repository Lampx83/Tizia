"""Cổng 2 — Escalation Policy cứng: plan xin capability nào ngoài `surface` là
chặn ngay, không gọi model, không cần người nói "không".

Tên surface/core cũ đọc từ server/contexts/capabilities.js. Tên D0 mới dùng
catalog surface của snapshot server và chỉ được nhắm file trong phạm vi đã cấp.
Không import JavaScript, vì import sẽ khởi tạo database của ứng dụng.
"""
from __future__ import annotations

import re
import posixpath
from functools import lru_cache
from pathlib import Path

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


def check(plan: dict, names: dict[str, frozenset[str]] | None = None, catalog: dict | None = None) -> dict:
    """{blocked, reason}. Allowlist: mọi thứ không nằm trong surface đều chặn —
    core, raw ws/sse, hay tên lạ model bịa ra, cùng một kết cục.

    Chỉ soi `capabilities` model TỰ khai — plan bỏ trống key này thì qua. Chốt
    thật là cổng 4 lint import trong code sinh ra; cổng này là
    lớp rẻ chặn sớm, không phải lớp duy nhất."""
    names = names or load_capability_names()
    files = [posixpath.normpath(str(task.get('file', '')).replace('\\', '/'))
             for task in plan.get('subtasks') or []]
    def allowed(file, policy):
        return (policy.get('tier') == 'surface'
                and any(file.startswith(prefix) for prefix in policy.get('allow', []))
                and not any(file.startswith(prefix) for prefix in policy.get('deny', [])))
    for cap in plan.get("capabilities") or []:
        if not isinstance(cap, str):
            return {"blocked": True, "reason": f"capability không phải chuỗi: {cap!r}"}
        if cap in names["surface"]:
            continue
        policy = (catalog or {}).get(cap, {})
        if any(allowed(file, policy) for file in files):
            continue
        tier = "thuộc core" if cap in names["core"] else "không có trong surface"
        return {"blocked": True, "reason": f"capability '{cap}' {tier} — plugin AI sinh không được cấp"}
    if any(cap not in names['surface'] for cap in plan.get('capabilities') or []):
        for file in files:
            if not any(allowed(file, (catalog or {}).get(cap, {})) for cap in plan['capabilities']):
                return {'blocked': True, 'reason': f"file '{file}' ngoài surface catalog đã cấp"}
    return {"blocked": False, "reason": None}


def run(state: dict) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại."""
    plan = state.get("plan")
    if not plan:
        return {"gate": 2, "blocked": True, "reason": "không có plan từ cổng 1"}
    return {"gate": 2, **check(plan, catalog=state.get('catalog'))}
