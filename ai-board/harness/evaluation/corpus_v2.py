"""Corpus v2 builder: dev/held-out cùng loại phép sửa, tách theo trang, câu chữ có nghĩa, seed + hash riêng.

    python -m evaluation.corpus_v2 --source <repo> --root <dir> --seed N [--exclude-pages pages.json]

Chỉ đọc trang ở commit ghim của source; không bao giờ mở held-out của corpus v1.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import random
from pathlib import Path

from evaluation import eval_corpus as v1

LEVELS = (1, 5)  # 1 đích duy nhất (named), 5 lời thường (plain)
PER_CELL = {"dev": 2, "heldout": 1}
HELDOUT_ONLY = ("change_link",)  # loại chỉ có ở held-out, báo cáo riêng
SEALED = ("heldout", "held-out", "sealed")
SUBJECTS = ("Lớp dược lâm sàng", "Buổi ôn tập", "Bài kiểm tra", "Phòng thực hành", "Giờ tư vấn", "Lịch trực lab", "Nhóm thảo luận",
            "Buổi hướng dẫn", "Đợt đăng ký", "Tiết học bù")
PREDICATES = ("bắt đầu lúc tám", "kết thúc trước giờ trưa", "dời sang thứ sáu", "mở lại từ tuần sau", "cần mang theo thẻ",
              "có thêm giờ hỗ trợ", "diễn ra tại phòng hai", "được nhắc qua thư")
TITLES2 = ("Lưu ý quan trọng", "Thông báo mới", "Hạn nộp", "Ghi chú lớp", "Nhắc việc", "Mẹo học", "Cần biết", "Lịch tuần")
TITLES3 = ("Hướng dẫn nộp bài", "Quy định phòng lab", "Lịch thi cuối kỳ", "Thông tin liên hệ", "Câu hỏi thường gặp", "Góp ý cho lớp")


class CorpusV2Error(RuntimeError):
    """Corpus v2 không dựng/ghi được."""


class MeaningRng(random.Random):
    """Rng thay random.sample(WORDS, k) của v1 bằng cụm có nghĩa (câu 5 từ, tiêu đề 2-3 từ)."""

    def sample(self, population, k, **kw):
        if population is v1.WORDS and k in (2, 3, 5):
            if k == 5:
                return f"{self.choice(SUBJECTS)} {self.choice(PREDICATES)}".split()
            return self.choice(TITLES2 if k == 2 else TITLES3).split()
        return super().sample(population, k, **kw)


def request_text(case: dict) -> dict:
    """{title, verify, detail} dựng từ facts của case; named nêu đích rõ, plain nói thường."""
    f, file = case["spec"][0]["facts"], case["file"]
    what = {"replace_text": lambda: f'đổi câu "{f["old"]}" thành "{f["new"]}"',
            "remove_element": lambda: f'xóa dòng "{f["old"]}"',
            "insert_text": lambda: f'thêm dòng "{f["new"]}" ngay dưới dòng "{f["after"]}"',
            "add_block": lambda: f'thêm khối ghi chú tiêu đề "{f["title"]}", nội dung "{f["body"]}" ngay dưới dòng "{f["after"]}"',
            "change_link": lambda: f'đổi liên kết "{f["text"]}" từ {f["old"]} sang {f["new"]}',
            "css_color": lambda: f'đổi màu chữ của {f["selector"]} sang {f["color_name"]} ({f["new"]})',
            "size_hide": lambda: (f'đổi cỡ chữ của {f["selector"]} từ {f["old"]}px sang {f["new"]}px' if f["variant"] == "size"
                                  else f'ẩn phần tử {f["selector"]}'),
            "new_page": lambda: f'tạo trang mới có tiêu đề "{f["title"]}", đoạn "{f["body"]}", link "{f["label"]}" tới {f["href"]}',
            }[case["kind"]]()
    title = f"Sửa nhỏ trên trang {Path(file).stem}" if case["style"] == "plain" else what[0].upper() + what[1:]
    return {"title": title, "verify": f"Trang {file} đúng yêu cầu: {what}.", "detail": f"Trên trang {file}: {what}."}


def _plan(rng: MeaningRng, pages: dict[str, str], base_sha: str, exclude: set) -> list[dict]:
    names = sorted(n for n in pages if n not in exclude)
    found = {n: v1.scan(pages[n]) for n in names}
    held = set(rng.sample(names, max(1, round(0.3 * len(names)))))
    used, taken, lines, cases, n_size = set(), set(), set(), [], 0
    for kind, levels in v1.CELLS.items():
        sides = ("heldout",) if kind in HELDOUT_ONLY else ("dev", "heldout")
        for side in sides:
            for level in (lv for lv in levels if lv in LEVELS):
                files = set()
                for _ in range(PER_CELL[side]):
                    variant = ("size", "hide")[n_size % 2] if kind == "size_hide" else None
                    n_size += kind == "size_hide"
                    if kind == "new_page":
                        body = v1.new_page_case(rng, used, names, taken)
                    else:
                        left = {n: [c for c in v1.candidates(found[n], kind, variant) if (n, c["line"]) not in lines]
                                for n in names if (n in held) == (side == "heldout") and v1.SIZE_OK[level](len(pages[n].encode("utf-8")))}
                        pool = [n for n, cands in left.items() if cands]
                        if not pool:
                            raise RuntimeError(f"không có trang hợp {kind} mức {level} ở {side}")
                        file = rng.choice([n for n in pool if n not in files] or pool)
                        body = v1.change_case(kind, file, pages[file], left[file], rng, used, names, level, variant)
                        files.add(file)
                        lines |= {(file, ch["line"]) for ch in body["spec"]}
                    style = "plain" if level == 5 else "named"
                    case = {"kind": kind, "types": [kind], "level": level, "style": style, "split": side, "base_sha": base_sha,
                            "group": "heldout_only" if kind in HELDOUT_ONLY else "shared", **body}
                    case["key"] = hashlib.sha1(json.dumps([case["file"], kind, level, style, case["gold"], base_sha, "v2"],
                                                          ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:10]
                    case["id"] = f"v2-{kind}-l{level}-{case['key'][:6]}"
                    cases.append({**case, **request_text(case)})
    return cases


def plan(seed: int, pages: dict[str, str], base_sha: str = v1.PIN, exclude=()) -> list[dict]:
    """Case tất định theo seed; cách chia trang không đủ hợp mọi ô thì thử cách chia kế."""
    for attempt in range(50):
        try:
            return _plan(MeaningRng(f"v2/{seed}/{attempt}"), pages, base_sha, set(exclude))
        except RuntimeError as error:
            failure = error
    raise CorpusV2Error(str(failure))


def load_exclude(path) -> set:
    """Danh sách trang cần tránh từ file JSON chỉ mục; từ chối đường dẫn held-out/niêm phong."""
    if any(tok in str(path).lower() for tok in SEALED):
        raise CorpusV2Error(f"không đọc đường dẫn held-out/niêm phong: {path}")
    return set(json.loads(Path(path).read_text(encoding="utf-8")))


def write(root, seed: int, pages: dict[str, str], base_sha: str = v1.PIN, exclude=()) -> dict:
    """Ghi corpus v2 dưới <root>: dev ở corpus-v2/s<seed>/, held-out ở <VAULT>/corpus-v2/s<seed>/; trả manifest công khai. Raise nếu đã có bản khác hash."""
    root, cases = Path(root), plan(seed, pages, base_sha, exclude)
    if shared := v1.page_overlap(cases):
        raise CorpusV2Error(f"trang xuất hiện ở cả dev và held-out: {shared}")
    dump = lambda obj: json.dumps(obj, ensure_ascii=False, indent=2).encode("utf-8")  # noqa: E731
    content_hash = hashlib.sha256(dump(cases)).hexdigest()
    sides = {s: [c for c in cases if c["split"] == s] for s in ("dev", "heldout")}
    rows = {s: [{**{k: c[k] for k in ("id", "key", "file", "types", "level", "style", "split", "group")},
                 "text_sha": v1.text_sha({k: c[k] for k in ("title", "verify", "detail")})} for c in part] for s, part in sides.items()}
    shared_types = lambda s: sorted({c["kind"] for c in sides[s] if c["group"] == "shared"})  # noqa: E731
    manifest = {"version": 2, "seed": seed, "base_sha": base_sha, "content_hash": content_hash, "cases": rows["dev"],
                "split": {s: {"cases": len(sides[s]), "types": shared_types(s)} for s in sides},
                "heldout_only": {"types": sorted(HELDOUT_ONLY), "cases": sum(c["group"] == "heldout_only" for c in cases)}}
    dirs = {"dev": root / "corpus-v2" / f"s{seed}", "heldout": root / v1.VAULT / "corpus-v2" / f"s{seed}"}
    old = dirs["dev"] / "manifest.json"
    if old.exists() and json.loads(old.read_text(encoding="utf-8")).get("content_hash") != content_hash:
        raise CorpusV2Error(f"đã có corpus v2 seed {seed} khác hash; đổi tập đo = seed mới (hoặc xóa {old})")
    for side, d in dirs.items():
        d.mkdir(parents=True, exist_ok=True)
        (d / "cases.json").write_bytes(dump(sides[side]))
        (d / "manifest.json").write_bytes(dump(manifest if side == "dev" else {
            "version": 2, "seed": seed, "content_hash": content_hash, "cases": rows["heldout"]}))
    return manifest


def main(argv=None) -> dict:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--source", required=True)
    ap.add_argument("--root", required=True)
    ap.add_argument("--seed", type=int, required=True)
    ap.add_argument("--exclude-pages")
    a = ap.parse_args(argv)
    manifest = write(a.root, a.seed, v1.real_pages(a.source), exclude=load_exclude(a.exclude_pages) if a.exclude_pages else ())
    print(f"corpus v2 seed {a.seed} hash {manifest['content_hash'][:12]}: {manifest['split']}")
    return manifest


if __name__ == "__main__":
    main()
