"""Corpus eval trên trang THẬT của repo ở commit ghim: phép biến đổi → gold chính xác + hàm kiểm khớp từng loại.

Gold = danh sách edit {search, replace} dựng từ chính trang (search khớp đúng 1 chỗ) hoặc trang mới nguyên văn.
Check theo mode: equal (trang sau canon == trang gold), surgery (chỉ chèn khối mới, trang còn lại giữ nguyên), page (trang mới có đủ ý chính).
"""
from __future__ import annotations

import hashlib
import json
import random
import re
import shutil
import subprocess
from collections import Counter
from pathlib import Path

PIN = "1e8683704f7f27b7b57793896c9f2472811e56bc"  # đầu main 2026-09-25; trang public/*.html lấy ở đây, không bao giờ ở HEAD
WORDS = ("học tập bài giảng ôn luyện kiểm tra thuốc đơn liều lượng cân pha chế mã nguồn biến hàm trang nút bảng điểm "
         "thẻ ghi nhớ lộ trình thành tựu sao xu chuỗi ngày").split()
# loại → các mức khó dùng; mỗi ô (loại, mức) 2 mẫu (mẫu 1 named, mẫu 2 plain; mức 5 luôn plain), ô EXTRA 3 mẫu → 60 case
# mức: 1 đích duy nhất trên trang nhỏ, 2 nhiều phần tử giống nhau, 3 trang > 20 KB, 4 hai thay đổi một request, 5 lời thường
CELLS = {"replace_text": (1, 2, 3, 4, 5), "insert_text": (1, 2, 3, 5), "css_color": (1, 2, 3, 5), "size_hide": (1, 2, 5),
         "remove_element": (1, 2, 3, 5), "add_block": (1, 3, 4, 5), "change_link": (1, 2, 5), "new_page": (1, 5)}
EXTRA = (("replace_text", 1), ("css_color", 1))
# held-out ~30% (18/60): loại + trang rời hẳn dev (không loại nào, trang nào xuất hiện ở cả hai); trang held-out = 30% số trang theo seed
HELDOUT_TYPES = ("add_block", "change_link", "new_page")
PALETTE = {"đỏ": "#dc2626", "xanh dương": "#1d4ed8", "xanh lá": "#16a34a", "cam": "#ea580c", "tím": "#7c3aed",
           "hồng": "#db2777", "nâu": "#92400e"}
SLUGS = "cam-on-gop-y gioi-thieu lien-he huong-dan hoi-dap thong-bao ve-chung-toi lich-hoc tai-lieu quy-dinh".split()
NEW_PAGE = ("<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>{title}</title>\n</head>\n<body>\n"
            "  <h1>{title}</h1>\n  <p>{body}</p>\n  <p><a href=\"{href}\">{label}</a></p>\n</body>\n</html>\n")
LINE = re.compile(r"^(\s*)<(p|li|h1|h2|h3|span|div|button|a|label|td|th)\b[^>]*>([^<>&'\"{}$\\]{8,90})</\2>\s*$")
RULE = re.compile(r"^\s*([.#]?[\w-]+(?: [.#]?[\w-]+)?)\s*\{([^{}]*)\}\s*$")
LINK = re.compile(r'^\s*<a\b[^>]*\bhref="([\w\-./]+\.html)"[^>]*>([^<>&\'"]{2,60})</a>\s*$')
HEX = re.compile(r"(?<![\w-])color\s*:\s*(#[0-9a-fA-F]{3,6})\b")  # lookbehind: loại background-color
SIZE = re.compile(r"font-size\s*:\s*(\d+)px")
INSERT_TAGS, BLOCK_TAGS = ("p", "li", "div", "span", "h2", "h3"), ("p", "h2", "h3", "div")


def sentence(rng: random.Random, used: set) -> str:
    """Câu 5 từ chưa dùng (tất định theo rng)."""
    while (text := " ".join(rng.sample(WORDS, 5)).capitalize() + ".") in used:
        pass
    used.add(text)
    return text


def real_pages(source, sha: str = PIN) -> dict[str, str]:
    """{public/x.html: nội dung blob} ở commit sha (chỉ cấp 1 của public/); blob thô, đúng thứ cổng 3 đọc, không đổi xuống dòng."""
    run = lambda args, data=None: subprocess.run(["git", *args], cwd=source, check=True, capture_output=True, input=data,  # noqa: E731
                                                 stdin=None if data else subprocess.DEVNULL).stdout
    names = [n for n in run(["ls-tree", "-z", "--name-only", sha, "public/"]).decode().split("\0") if n.endswith(".html")]
    raw, pages, at = run(["cat-file", "--batch"], "".join(f"{sha}:{n}\n" for n in names).encode()), {}, 0
    for name in names:
        end = raw.index(b"\n", at)
        size = int(raw[at:end].split()[2])
        pages[name] = raw[end + 1:end + 1 + size].decode("utf-8")
        at = end + size + 2
    return pages


def scan(text: str) -> dict[str, list[dict]]:
    """Ứng viên đích của trang: dòng chữ / luật CSS 1 dòng (trong <style>) / link nội bộ, mỗi dòng khớp đúng 1 chỗ."""
    spans = [(m.start(), m.end(), m.group(1).lower()) for m in re.finditer(r"<(script|style)\b.*?</\1>", text, re.S | re.I)]
    found: dict[str, list[dict]] = {"text": [], "css": [], "link": []}
    pos = 0
    for line in text.split("\n"):
        start, pos = pos, pos + len(line) + 1
        where = next((k for a, b, k in spans if a <= start < b), None)
        if where == "style":
            if (m := RULE.match(line)) and text.count(line + "\n") == 1:
                found["css"].append({"line": line, "sel": m.group(1), "body": m.group(2)})
        elif where is None:
            m, link = LINE.match(line), LINK.match(line)
            if not (m or link) or text.count(line + "\n") != 1:
                continue
            if m and text.count(m.group(3)) == 1:
                found["text"].append({"line": line, "indent": m.group(1), "tag": m.group(2), "text": m.group(3)})
            if link and line.count("<a ") == 1:
                found["link"].append({"line": line, "href": link.group(1), "text": link.group(2)})
    return found


def candidates(found: dict, kind: str, variant: str | None = None) -> list[dict]:
    """Ứng viên hợp với loại phép biến đổi."""
    if kind == "css_color":
        return [c for c in found["css"] if HEX.search(c["body"])]
    if kind == "size_hide":
        return [c for c in found["css"] if (SIZE.search(c["body"]) if variant == "size" else "display" not in c["body"])]
    if kind == "change_link":
        return found["link"]
    tags = {"insert_text": INSERT_TAGS, "add_block": BLOCK_TAGS}.get(kind)
    return [c for c in found["text"] if tags is None or c["tag"] in tags]


def make_change(kind: str, c: dict, rng: random.Random, used: set, names: list[str], variant: str | None = None) -> dict:
    """1 thay đổi: {type, search, replace, required, facts}; search khớp đúng 1 chỗ trang gốc."""
    line, facts, required = c["line"], {}, []
    if kind == "replace_text":
        new = sentence(rng, used)
        search, replace, facts = f">{c['text']}</{c['tag']}>", f">{new}</{c['tag']}>", {"old": c["text"], "new": new}
    elif kind == "remove_element":
        search, replace, facts = line + "\n", "", {"old": c["text"], "tag": c["tag"]}
    elif kind == "insert_text":
        new = sentence(rng, used)
        search, replace, required = line, f"{line}\n{c['indent']}<{c['tag']}>{new}</{c['tag']}>", [new]
        facts = {"after": c["text"], "new": new, "tag": c["tag"]}
    elif kind == "add_block":
        title, body = " ".join(rng.sample(WORDS, 2)).capitalize(), sentence(rng, used)
        block = f'<div class="ghi-chu"><strong>{title}</strong> {body}</div>'
        search, replace, required = line, f"{line}\n{c['indent']}{block}", [title, body]
        facts = {"after": c["text"], "title": title, "body": body}
    elif kind == "change_link":
        new = "/" + rng.choice([n[len("public/"):] for n in names if n[len("public/"):] != c["href"].lstrip("/")])
        search, replace, facts = line, line.replace(f'href="{c["href"]}"', f'href="{new}"'), {"text": c["text"], "old": c["href"], "new": new}
    elif kind == "css_color":
        old = HEX.search(c["body"]).group(1)
        name, new = rng.choice([(n, h) for n, h in PALETTE.items() if h != old.lower()])
        search, replace, facts = line, line.replace(old, new, 1), {"selector": c["sel"], "old": old, "new": new, "color_name": name}
    elif variant == "size":
        old = int(SIZE.search(c["body"]).group(1))
        new = round(old * rng.choice([0.75, 1.3, 1.6])) or old + 2
        search, replace, facts = line, SIZE.sub(f"font-size:{new}px", line, 1), {"selector": c["sel"], "old": old, "new": new, "variant": "size"}
    else:
        search, replace, facts = line, line.replace("{", "{ display:none;", 1), {"selector": c["sel"], "variant": "hide"}
    return {"type": kind, "line": line, "search": search, "replace": replace, "required": required, "facts": facts}


def _decls(body: str) -> str:
    return ";".join(sorted(re.sub(r"\s*:\s*", ":", d.strip().lower()) for d in body.split(";") if d.strip()))


def canon(html: str) -> str:
    """Dạng so sánh: bỏ khác biệt khoảng trắng; trong <style> khai báo CSS sắp thứ tự, hex hạ chữ thường."""
    html = re.sub(r"(<style\b[^>]*>)(.*?)(</style>)", lambda m: m.group(1) + re.sub(
        r"([^{}]+)\{([^{}]*)\}", lambda r: " ".join(r.group(1).split()) + "{" + _decls(r.group(2)) + "}", m.group(2)) + m.group(3),
        html, flags=re.S | re.I)
    return re.sub(r">\s+<", "><", re.sub(r"\s+", " ", html)).strip()


def apply_gold(base: str, edits: list[dict]) -> str:
    """Áp lần lượt các edit gold; raise nếu search không khớp đúng 1 chỗ."""
    for edit in edits:
        if base.count(edit["search"]) != 1:
            raise RuntimeError(f"gold search không khớp đúng 1 chỗ: {edit['search'][:80]!r}")
        base = base.replace(edit["search"], edit["replace"], 1)
    return base


def check(html: str, base: str | None, case: dict) -> bool:
    """Trang model sinh có đúng theo gold của case không (theo check.mode)."""
    mode = case["check"]["mode"]
    if mode == "page":
        gold, title = case["check"], re.search(r"<title>(.*?)</title>", html, re.S | re.I)
        heading = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S | re.I)
        hrefs = {re.sub(r"^(\./|/)", "", h) for h in re.findall(r'href="([^"]+)"', html)}
        return bool(title and heading and "<html" in html.lower() and "</html>" in html.lower() and gold["title"] in title.group(1)
                    and gold["title"] in heading.group(1) and gold["body"] in html and gold["href"].lstrip("/") in hrefs)
    edits = case["gold"]["edits"]
    if mode == "equal":
        return canon(html) == canon(apply_gold(base, edits))
    blocks = [canon(e["replace"][len(e["search"]):]) for e in edits]  # surgery: chỉ chèn, mọi thứ khác giữ nguyên
    pieces = [canon(apply_gold(base, edits))]
    for block in blocks:
        pieces[-1:] = pieces[-1].split(block, 1)
    head, middle, tail = pieces[0], pieces[1:-1], pieces[-1]
    got = canon(html)
    if not (got.startswith(head) and got.endswith(tail) and len(got) >= len(head) + len(tail)):
        return False
    inner = got[len(head):len(got) - len(tail)]
    parts = inner.split(middle[0], 1) if middle else [inner]
    return len(parts) == len(blocks) and all(p.startswith("<") and p.endswith(">") and all(r in p for r in need)
                                              for p, need in zip(parts, case["check"]["required"]))


SIZE_OK = {1: lambda n: n < 9000, 2: lambda n: 9000 <= n <= 20000, 3: lambda n: n > 20000, 4: lambda n: 6000 <= n <= 20000,
           5: lambda n: n <= 20000}  # độ dài trang theo mức khó


def context(base: str, search: str) -> list[str]:
    """2 dòng trước/sau chỗ search, cho người viết câu request."""
    at = base[:base.index(search)].count("\n")
    return [line.strip()[:140] for line in base.split("\n")[max(0, at - 2):at + 3]]


def new_page_case(rng: random.Random, used: set, names: list[str], taken: set) -> dict:
    """Case trang tĩnh mới: gold là trang nguyên văn, check theo ý chính (tiêu đề, đoạn, link)."""
    slug = rng.choice([s for s in SLUGS if f"public/{s}.html" not in names and s not in taken])
    taken.add(slug)
    page = {"title": " ".join(rng.sample(WORDS, 3)).capitalize(), "body": sentence(rng, used),
            "href": "/" + rng.choice(names)[len("public/"):], "label": rng.choice(["Quay lại", "Về trang trước", "Xem thêm"])}
    return {"file": f"public/{slug}.html", "gold": {"code": NEW_PAGE.format(**page)}, "spec": [{"type": "new_page", "facts": page}],
            "check": {"mode": "page", "title": page["title"], "body": page["body"], "href": page["href"]}}


def change_case(kind: str, file: str, base: str, cands: list[dict], rng: random.Random, used: set, names: list[str], level: int,
                variant) -> dict:
    """Case sửa trang có sẵn: 1 thay đổi (2 ở mức 4, hai đích khác nhau, thứ tự theo trang)."""
    picks = rng.sample(cands, 2 if level == 4 else 1)
    picks.sort(key=lambda c: base.index(c["line"]))
    changes = [make_change(kind, c, rng, used, names, variant) for c in picks]
    edits = [{"search": c["search"], "replace": c["replace"]} for c in changes]
    apply_gold(base, edits)  # sớm raise nếu gold không áp được
    similar = [c["line"].strip()[:100] for c in cands if c not in picks][:4]
    return {"file": file, "page_bytes": len(base.encode("utf-8")), "gold": {"edits": edits},
            "check": {"mode": "surgery" if kind in ("insert_text", "add_block") else "equal", "required": [c["required"] for c in changes]},
            "spec": [{"type": kind, **c, "context": context(base, c["search"]), "similar": similar} for c in changes]}


def plan(seed: int, pages: dict[str, str], base_sha: str = PIN) -> list[dict]:
    """Case tất định theo seed. Cách chia trang dev/held-out nào không đủ trang hợp mọi ô thì thử cách chia kế (cũng tất định)."""
    for attempt in range(50):
        try:
            return _plan(random.Random(f"{seed}/{attempt}"), pages, base_sha)
        except RuntimeError as error:
            failure = error
    raise failure


def _plan(rng: random.Random, pages: dict[str, str], base_sha: str) -> list[dict]:
    """Mỗi (loại, mức) vài mẫu trên trang thật hợp mức đó, mỗi đích dùng tối đa 1 lần."""
    used, names, n_size_hide = set(), sorted(pages), 0
    found, taken, lines, cases = {n: scan(pages[n]) for n in names}, set(), set(), []
    heldout_pages = set(rng.sample(names, round(0.3 * len(names))))
    for kind, levels in CELLS.items():
        split = "heldout" if kind in HELDOUT_TYPES else "dev"
        for level in levels:
            files = set()
            for sample in range(3 if (kind, level) in EXTRA else 2):
                variant = ("size", "hide")[n_size_hide % 2] if kind == "size_hide" else None
                n_size_hide += kind == "size_hide"
                if kind == "new_page":
                    body = new_page_case(rng, used, names, taken)
                else:
                    need = 2 if level == 4 or (kind == "change_link" and level == 2) else 6 if level == 2 else 1
                    left = {n: [c for c in candidates(found[n], kind, variant) if (n, c["line"]) not in lines]
                            for n in names if (n in heldout_pages) == (split == "heldout") and SIZE_OK[level](len(pages[n].encode("utf-8")))}
                    pool = [n for n, cands in left.items() if len(cands) >= need]
                    if not pool:
                        raise RuntimeError(f"không có trang hợp {kind} mức {level} ở {base_sha[:10]}")
                    file = rng.choice([n for n in pool if n not in files] or pool)
                    body = change_case(kind, file, pages[file], left[file], rng, used, names, level, variant)
                    files.add(file)
                    lines |= {(file, change["line"]) for change in body["spec"]}
                style = "plain" if level == 5 or sample == 1 else "named"
                case = {"kind": kind, "types": [kind], "level": level, "style": style, "split": split, "base_sha": base_sha, **body}
                case["key"] = hashlib.sha1(json.dumps([case["file"], kind, level, style, case["gold"], base_sha], ensure_ascii=False,
                                                      sort_keys=True).encode("utf-8")).hexdigest()[:10]
                case["id"] = f"{kind}-l{level}-{case['key'][:6]}"
                cases.append(case)
    return cases


def checkout_at(root: Path, sha: str, source) -> Path:
    """Bản clone trần của source với HEAD = sha (không working tree): retrieval chỉ thấy trạng thái ở sha."""
    dest = Path(root) / "checkouts" / sha[:12]
    if dest.exists() and (dest / "HEAD").read_text().strip() != sha:
        shutil.rmtree(dest, ignore_errors=True)  # dựng dở bị kill
    if not dest.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["git", "clone", "-q", "--bare", "--shared", str(source), str(dest)], check=True, capture_output=True,
                       stdin=subprocess.DEVNULL)
        subprocess.run(["git", "update-ref", "--no-deref", "HEAD", sha], cwd=dest, check=True, capture_output=True,
                       stdin=subprocess.DEVNULL)
    return dest


class CorpusError(RuntimeError):
    """Corpus không dùng được: thiếu chữ đóng băng hoặc chữ đã đóng băng bị sửa."""


def text_sha(text: dict) -> str:
    return hashlib.sha1(json.dumps(text, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:12]


def write_corpus(root: Path, seed: int, source) -> list[dict]:
    """Corpus theo seed + commit ghim → <root>/corpus/full-s<seed>/{cases,manifest}.json (byte-identical khi sinh lại).
    Chữ request (title/verify/detail) do người viết một lần trong corpus/texts.json theo key của case; code không bao giờ sinh hay
    ghi đè chúng. Thiếu chữ → ghi texts-todo.json, raise. Chữ đổi so với manifest lần trước → raise (đổi cố ý: xóa manifest)."""
    corpus = Path(root) / "corpus"
    dest = corpus / f"full-s{seed}"
    cases = plan(seed, real_pages(source))
    texts = json.loads((corpus / "texts.json").read_text(encoding="utf-8")) if (corpus / "texts.json").exists() else {}
    if missing := [c for c in cases if c["key"] not in texts]:
        corpus.mkdir(parents=True, exist_ok=True)
        todo = [{k: c[k] for k in ("key", "level", "style", "types", "file", "spec")} for c in missing]
        (corpus / "texts-todo.json").write_bytes(json.dumps(todo, ensure_ascii=False, indent=2).encode("utf-8"))
        raise CorpusError(f"{len(missing)}/{len(cases)} case chưa có chữ đóng băng: viết vào {corpus / 'texts.json'} theo texts-todo.json")
    cases = [{**c, **texts[c["key"]]} for c in cases]
    rows = [{**{k: c[k] for k in ("id", "key", "file", "types", "level", "style", "split", "page_bytes") if k in c},
             "text_sha": text_sha(texts[c["key"]])} for c in cases]
    sides = {side: [r for r in rows if r["split"] == side] for side in ("dev", "heldout")}
    manifest = {"seed": seed, "base_sha": PIN,
                "split": {side: {"cases": len(part), "pages": sorted({r["file"] for r in part}), "types": sorted({t for r in part for t in r["types"]})}
                          for side, part in sides.items()},
                "cases": rows}
    if (dest / "manifest.json").exists():
        before = {r["key"]: r["text_sha"] for r in json.loads((dest / "manifest.json").read_text(encoding="utf-8"))["cases"]}
        if changed := [r["id"] for r in rows if before.get(r["key"], r["text_sha"]) != r["text_sha"]]:
            raise CorpusError(f"chữ đóng băng đã bị sửa ở {changed}; muốn đổi cố ý thì xóa {dest / 'manifest.json'}")
    dest.mkdir(parents=True, exist_ok=True)
    (dest / "cases.json").write_bytes(json.dumps(cases, ensure_ascii=False, indent=2).encode("utf-8"))
    (dest / "manifest.json").write_bytes(json.dumps(manifest, ensure_ascii=False, indent=2).encode("utf-8"))
    return cases


def summary(cases: list[dict]) -> str:
    """Số case mỗi split và mỗi ô (loại, mức), tách theo kiểu câu."""
    cells: dict = {}
    for c in cases:
        styles = cells.setdefault((c["split"], c["kind"], c["level"]), {})
        styles[c["style"]] = styles.get(c["style"], 0) + 1
    totals = Counter(c["split"] for c in cases)
    return chr(10).join([f"{len(cases)} case (dev {totals['dev']}, heldout {totals['heldout']})"] + [
        f"  {split} {kind} L{level}: {sum(s.values())} ({', '.join(f'{k} {v}' for k, v in sorted(s.items()))})" for (split, kind, level), s in cells.items()])


def case_record(case: dict, root: Path, source) -> dict:
    """Case corpus → bản ghi cho eval_gold.run_case, chạy trên checkout ở base_sha của case."""
    repo = checkout_at(root, case["base_sha"], source)
    base = None
    if "edits" in case["gold"]:
        base = subprocess.run(["git", "show", f"{case['base_sha']}:{case['file']}"], cwd=repo, check=True, capture_output=True,
                              stdin=subprocess.DEVNULL).stdout.decode("utf-8")
    return {"subtask": {"title": case["title"], "file": case["file"], "size": "small", "verify": case["verify"]},
            "detail": case["detail"], "checkout": str(repo), "oracle": lambda html: check(html, base, case)}
