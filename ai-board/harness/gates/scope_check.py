"""Cổng 2 — Escalation Policy cứng: plan xin capability nào ngoài `surface` là
chặn ngay, không gọi model, không cần người nói "không".

Danh sách surface/core đọc THẲNG từ server/contexts/capabilities.js (nguồn sự
thật duy nhất) — không chép tay sang Python. Chỉ cần tên key cấp 1 của 2 object
`surface`/`core`, nên parse text là đủ; import JS thật sẽ kéo db.js mở SQLite.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
CAPABILITIES_JS = ROOT / "server" / "contexts" / "capabilities.js"

# ponytail: regex bám vào format `export const <tier> = xxx({` ... `});` với key
# cấp 1 thụt đúng 2 space. Đổi format file JS là test
# test_capability_names_parsed_from_real_capabilities_js đỏ ngay — đó là chốt.
_BLOCK = r"^export const {tier} = (?:deepFreeze|Object\.freeze)\(\{{\n(.*?)^\}}\);"
# `db,` (shorthand) lẫn `features: {` (key: value) đều là key cấp 1.
_TOP_KEY = re.compile(r"^  (\w+)[:,]", re.M)


def load_capability_names(path: Path = CAPABILITIES_JS) -> dict[str, frozenset[str]]:
    """{'surface': {...}, 'core': {...}} — tên key cấp 1 của 2 object trong capabilities.js."""
    src = path.read_text(encoding="utf-8")
    out = {}
    for tier in ("surface", "core"):
        m = re.search(_BLOCK.format(tier=tier), src, re.S | re.M)
        if not m:
            raise ValueError(f"không tìm thấy `export const {tier}` trong {path}")
        out[tier] = frozenset(_TOP_KEY.findall(m.group(1)))
    return out


def check(plan: dict, names: dict[str, frozenset[str]] | None = None) -> dict:
    """{blocked, reason}. Allowlist: mọi thứ không nằm trong surface đều chặn —
    core, raw ws/sse, hay tên lạ model bịa ra, cùng một kết cục."""
    names = names or load_capability_names()
    for cap in plan.get("capabilities") or []:
        if not isinstance(cap, str):
            return {"blocked": True, "reason": f"capability không phải chuỗi: {cap!r}"}
        if cap in names["surface"]:
            continue
        tier = "thuộc core" if cap in names["core"] else "không có trong surface"
        return {"blocked": True, "reason": f"capability '{cap}' {tier} — plugin AI sinh không được cấp"}
    return {"blocked": False, "reason": None}


def run(state: dict, names: dict | None = None) -> dict:
    """Điểm vào cho main.run_gate. Đọc state['plan'] do cổng 1 để lại."""
    plan = state.get("plan")
    if not plan:
        return {"gate": 2, "blocked": True, "reason": "không có plan từ cổng 1"}
    return {"gate": 2, **check(plan, names)}
