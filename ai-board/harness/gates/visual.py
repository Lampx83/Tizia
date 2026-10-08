"""Cổng ảnh tất định, chạy trong gate 5 cùng lần chụp ảnh.

audit(page, selectors) đo trên trang đang mở:
- tương phản chữ thật (màu + opacity tích luỹ của cả nhóm + nền, nền gradient lấy trung bình điểm màu);
- nút bấm bị phần tử khác đè (elementFromPoint ở tâm nút);
- trang tràn ngang; phần tử bị đổi nằm ngoài màn hình;
- khối nền trắng/đen lệch hẳn tông nền xung quanh (vd hộp trắng giữa trang tối).
Selector bị đổi không khớp phần tử nào (toast/popup chỉ tạo khi có sự kiện) → chèn phần tử thử mang đúng
class/id đó để CSS mới đặt nó vào chỗ sẽ hiện, rồi đo như phần tử thật.
regressions(before, after): chỉ lỗi MỚI của bản sau — lỗi có sẵn ở bản trước không bị phạt.
"""
from __future__ import annotations

import html
import re

# ponytail: nền ảnh (url) không đo được — coi như nền màu gần nhất; lấy mẫu pixel từ ảnh chụp nếu gặp sai.
AUDIT_JS = r"""
(sels) => {
  // Hiện dần/trượt vào: đo trạng thái cuối, không đo khung hình giữa chừng (opacity ~0 → tương phản giả 1.00).
  for (const a of document.getAnimations()) {
    try { if (a.effect && a.effect.getComputedTiming().iterations !== Infinity) a.finish(); } catch (_) {}
  }
  const vw = innerWidth, vh = innerHeight, cs = e => getComputedStyle(e);
  const key = e => {
    const cls = typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + cls + ' "' + (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30) + '"';
  };
  // Phần tử thử cho selector chưa có trên trang, chỉ dựng được khi mỗi đoạn là .class/#id thuần.
  const probes = [];
  for (const s of sels) {
    let hit = []; try { hit = [...document.querySelectorAll(s)]; } catch (_) { continue; }
    const parts = s.trim().split(/\s+/);
    if (hit.length || !parts.every(p => /^([.#][\w-]+)+$/.test(p))) continue;
    let host = document.body;
    for (const p of parts) {
      const el = document.createElement('div');
      for (const m of p.matchAll(/([.#])([\w-]+)/g)) m[1] === '#' ? (el.id = m[2]) : el.classList.add(m[2]);
      host.appendChild(el); host = el;
    }
    host.textContent = 'Thông báo thử của cổng ảnh — nội dung dài vừa một dòng';
    host.dataset.visualProbe = '1'; // chỉ đo vị trí; màu chữ thử không phải màu thật
    probes.push(document.body.lastElementChild);
  }
  const scope = [];
  for (const s of sels) { try { document.querySelectorAll(s).forEach(e => scope.push(e)); } catch (_) {} }
  const shown = e => { const r = e.getBoundingClientRect(), s = cs(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const rgba = c => { const m = /rgba?\(([^)]+)\)/.exec(c || ''); if (!m) return null;
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const over = (top, bottom) => [0, 1, 2].map(i => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ratio = (x, y) => { const [a, b] = [lum(x), lum(y)].sort((p, q) => q - p); return (a + 0.05) / (b + 0.05); };
  const opacity = e => { let o = 1; for (let x = e; x; x = x.parentElement) o *= Number(cs(x).opacity); return o; };
  const own = e => { const s = cs(e), stops = [...(s.backgroundImage || '').matchAll(/rgba?\([^)]+\)/g)].map(m => rgba(m[0]));
    const weight = stops.reduce((a, c) => a + c[3], 0); // điểm màu trong suốt không kéo màu nền
    if (weight > 0) return [0, 1, 2].map(i => stops.reduce((a, c) => a + c[i] * c[3], 0) / weight).concat(Math.max(...stops.map(c => c[3])));
    return rgba(s.backgroundColor); };
  // Màu sau cùng của nền + chữ: nhân opacity tích luỹ lên phần nền/chữ riêng của nhóm, ghép trên nền tổ tiên.
  const effective = e => {
    const chain = []; for (let x = e; x; x = x.parentElement) chain.unshift(x);
    let backdrop = [255, 255, 255, 1];
    let k = chain.findIndex(x => Number(cs(x).opacity) < 1);
    if (k < 0) k = chain.length;
    for (let i = 0; i < k; i++) { const c = own(chain[i]); if (c && c[3] > 0) backdrop = over(c, backdrop); }
    let group = backdrop, alpha = 1;
    for (let i = k; i < chain.length; i++) { const c = own(chain[i]); if (c && c[3] > 0) group = over(c, group); alpha *= Number(cs(chain[i]).opacity); }
    const fg = rgba(cs(e).color) || [0, 0, 0, 1];
    const text = over(fg, group);
    return { bg: over([...group.slice(0, 3), alpha], backdrop), text: over([...text.slice(0, 3), alpha], backdrop) };
  };

  const contrast = [];
  let checked = 0;
  for (const e of document.querySelectorAll('body *')) {
    if (checked > 600) break;
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'OPTION'].includes(e.tagName) || e.dataset.visualProbe || !shown(e)) continue;
    checked++;
    if (opacity(e) < 0.1) continue; // gần như trong suốt: không phải chữ người dùng đọc
    const s = cs(e), { bg, text } = effective(e), r = ratio(text, bg);
    const size = parseFloat(s.fontSize), large = size >= 24 || (size >= 18.66 && Number(s.fontWeight) >= 700);
    if (r < (large ? 3 : 4.5)) contrast.push(key(e) + ' ' + r.toFixed(2));
  }

  const covered = [];
  for (const e of document.querySelectorAll('button, a[href], [role=button], input, select, textarea')) {
    const r = e.getBoundingClientRect();
    if (!shown(e) || r.bottom <= 0 || r.right <= 0 || r.top >= vh || r.left >= vw) continue;
    const x = Math.min(Math.max(r.left + r.width / 2, 0), vw - 1), y = Math.min(Math.max(r.top + r.height / 2, 0), vh - 1);
    const hit = document.elementFromPoint(x, y);
    if (!hit || e.contains(hit) || hit.contains(e)) continue;
    covered.push(key(e) + ' dưới ' + key(hit));
  }

  const offscreen = [], patch = [];
  for (const e of scope) {
    if (!shown(e)) continue;
    const r = e.getBoundingClientRect();
    if (r.right <= 0 || r.left >= vw || r.bottom + scrollY <= 0) offscreen.push(key(e));
    const c = own(e);
    if (c && c[3] >= 0.5 && e.parentElement) {
      const mine = effective(e).bg, around = effective(e.parentElement).bg;
      const neutral = Math.max(...mine.slice(0, 3)) - Math.min(...mine.slice(0, 3)) < 30;
      if (neutral && ratio(mine, around) > 4.5) patch.push(key(e));
    }
  }
  const result = { overflow: document.documentElement.scrollWidth > vw + 1, contrast, covered, offscreen, patch, checked };
  probes.forEach(p => p.remove());
  return result;
}
"""

_ATTR_ID = re.compile(r"""\bid=["']([\w-]+)["']""")
_ATTR_CLASS = re.compile(r"""\bclass=["']([\w\s-]+)["']""")
_RULE = re.compile(r"([^{};@/*]+?)\s*\{")
MAX_SELECTORS = 20


def changed_selectors(full_diff: list[dict] | None) -> list[str]:
    """Phần tử bị đổi: #id/.class ở dòng HTML thêm vào + selector của rule CSS có dòng thêm (kể cả CSS trong JS)."""
    found: list[str] = []
    for item in full_diff or []:
        rule = None
        for line in str(item.get("diff", "")).splitlines():
            if line.startswith(("+++", "---", "@@", "diff ")) or not line[:1] in "+ ":
                rule = None if line.startswith(("@@", "diff ")) else rule
                continue
            body = line[1:]
            match = _RULE.search(body)
            if match and not body.lstrip().startswith("<"):
                rule = " ".join(match.group(1).split(",")[0].split())
            if line.startswith("+"):
                found += ["#" + m for m in _ATTR_ID.findall(body)]
                found += ["." + c for m in _ATTR_CLASS.findall(body) for c in m.split()]
                if rule and not body.lstrip().startswith("<"):
                    found.append(rule)
            if "}" in body:
                rule = None
    return list(dict.fromkeys(s for s in found if s.strip()))[:MAX_SELECTORS]


SETTLE_JS = """([quiet, cap]) => new Promise((done) => {
  let timer;
  const finish = () => { observer.disconnect(); clearTimeout(timer); done(); };
  const arm = () => { clearTimeout(timer); timer = setTimeout(finish, quiet); };
  const observer = new MutationObserver(arm);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, characterData: true });
  arm();
  setTimeout(finish, cap);
})"""


def settle(page, quiet_ms: int = 1200, load_ms: int = 15000, idle_ms: int = 3000, cap_ms: int = 10000) -> None:
    """Đợi trang dựng xong trước khi đo: sự kiện load (ảnh/iframe, tối đa load_ms), mạng yên (module/fetch JS dựng UI,
    tối đa idle_ms; trang polling không bao giờ yên thì chỉ mất idle_ms), rồi DOM yên quiet_ms (tối đa cap_ms).
    Máy bận thì UI dựng muộn; đo sớm làm lỗi thị giác biến mất ngẫu nhiên."""
    for state, timeout in (("load", load_ms), ("networkidle", idle_ms)):
        try:
            page.wait_for_load_state(state, timeout=timeout)
        except Exception:  # noqa: BLE001 — quá chậm/không yên: vẫn đo trạng thái hiện có
            pass
    page.evaluate(SETTLE_JS, [quiet_ms, cap_ms])


def audit(page, selectors: list[str]) -> dict:
    return page.evaluate(AUDIT_JS, list(selectors))


_TAG = re.compile(r"<[^>]*>")
_CODEISH = re.compile(r"[{};]|=>|\bconst\b|\blet\b|\bfunction\b")
MAX_TEXTS = 3


def changed_texts(full_diff: list[dict] | None, side: str) -> list[str]:
    """Chữ nhìn thấy trong dòng HTML thêm (side '+', bản sau) hoặc bớt ('-', bản trước): để tìm phần tử đổi khi diff không có #id/.class.
    Chỉ file .html; dòng giống mã (JS/CSS trong <script>/<style>) bỏ; dài nhất trước, tối đa MAX_TEXTS."""
    found: list[str] = []
    for item in full_diff or []:
        current = str(item.get("file", ""))  # pipeline gives one combined git diff with file "": follow its "+++ b/<path>" lines
        for line in str(item.get("diff", "")).splitlines():
            if line.startswith("+++ "):
                current = line[4:].removeprefix("b/")
            if not current.endswith(".html") or not line.startswith(side) or line.startswith(side * 3):
                continue
            text = " ".join(html.unescape(_TAG.sub(" ", line[1:])).split())
            if len(text) >= 3 and any(ch.isalpha() for ch in text) and not _CODEISH.search(text):
                found.append(text)
    return sorted(dict.fromkeys(found), key=len, reverse=True)[:MAX_TEXTS]


def _new_contrast(before: list[str], after: list[str]) -> list[str]:
    """Phần tử chữ mờ mới: so theo thẻ/id/class, không theo chữ và tỉ số. Chữ vốn mờ mà vẫn mờ (kể cả khi đổi chữ) không phải lỗi mới;
    thêm một phần tử mờ cùng loại thì đếm dư ra là lỗi mới."""
    from collections import Counter

    kind = lambda entry: entry.split(' "', 1)[0]
    pool = Counter(kind(entry) for entry in before)
    new = []
    for entry in after:
        if pool[kind(entry)] > 0:
            pool[kind(entry)] -= 1
        else:
            new.append(entry)
    return new


def regressions(before: dict | None, after: dict) -> list[str]:
    """Lỗi mới của bản sau so với bản trước (before None = trang mới: mọi lỗi đều mới)."""
    before = before or {}
    out = ["trang tràn ngang"] if after.get("overflow") and not before.get("overflow") else []
    for label, new in (
            ("chữ tương phản thấp (< 4.5)", _new_contrast(before.get("contrast", []), after.get("contrast", []))),
            ("nút bấm bị phần tử khác đè", [c for c in after.get("covered", []) if c not in before.get("covered", [])]),
            ("phần tử bị đổi nằm ngoài màn hình", [c for c in after.get("offscreen", []) if c not in before.get("offscreen", [])]),
            ("khối nền trắng/đen lệch tông trang", [c for c in after.get("patch", []) if c not in before.get("patch", [])])):
        if new:
            out.append(f"{label}: {'; '.join(new[:3])}" + (f" (+{len(new) - 3})" if len(new) > 3 else ""))
    return out
