"""Git tier (b): commit sạch trong lịch sử → case sửa hành vi JS/HTML nhỏ, chạy ở commit CHA với commit gốc làm gold.

    python eval_run.py git-build [--repo DIR] [--branch main] [--root DIR]    # lọc, ghi lý do từng commit, ghim checkout
    python eval_run.py git [--repeats 3] [--budget-minutes M] [--baseline report.json] [--model M] [--root DIR]

Ứng viên: commit non-merge chạm 1-3 file public/, diff public/ <= 60 dòng (đếm thô, gồm file phụ). Lọc tự động, MỖI commit non-merge của
nhánh có 1 dòng lý do (giữ/loại) trong <root>/corpus-git/cleaning.tsv để người dùng lướt: changelog-only, file phụ (changelog,
đổi version sw.js, đổi ?v=), dữ liệu quiz/bài học, chạm file ngoài public/, không phải js/html, thêm/xóa file, trùng patch.
Chữ request viết MỘT lần (giọng người học, named | plain) và đóng băng ở corpus-git/requests.json {sha9: {style,title,detail,verify}};
build không tự sinh chữ. Mỗi case ghim base sha: <root>/corpus-git/checkouts/<sha12> là repo rỗng-cây, HEAD tách tại commit cha,
objects mượn từ repo gốc (alternates) nên tốn vài KB.
Nhãn: lớp 1 tất định (mọi file gold đã đổi, edits áp được = cổng 3 qua, cú pháp JS không hỏng thêm). Lớp 2 hành vi bằng trình duyệt: HOÃN
(cần dựng trang ở commit cha + script kiểm từng case; chỉ commit đổi chữ/style hiện ra mới đáng làm). Lớp 3 giám khảo mềm: eval_judge,
báo riêng. Ship rate chính thức = lớp 1 + oracle sản xuất (cổng 5); tier này không chạy cổng 5 nên official_ship_rate = None.
Không giả định oracle test cơ học: 0/65 commit mẫu có test kèm.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import eval_judge  # noqa: E402
import eval_recall  # noqa: E402
from gates import static_check  # noqa: E402
from main import ROOT  # noqa: E402

DIR = "corpus-git"
MAX_FILES, MAX_LINES = 3, 60
DATA = re.compile(r"public/js/scenarios/[^/]+/.*|public/js/domains/[^/]+/(?:modules|achievements|subjects|experiences)\.js")
LAYERS = {"layer1": "tất định: mọi file gold đã đổi, edits áp được (cổng 3 qua), cú pháp JS không hỏng thêm",
          "layer2": "HOÃN: kiểm hành vi bằng trình duyệt chưa dựng (cần trang ở commit cha + script từng case)",
          "layer3": "giám khảo mềm (--judge): báo riêng, KHÔNG vào ship rate"}


def _git(args: list[str], cwd, **kw) -> str:
    return subprocess.run(["git", "-c", "core.quotepath=false", *args], cwd=cwd, check=True, capture_output=True, text=True,
                          encoding="utf-8", errors="replace", stdin=subprocess.DEVNULL, **kw).stdout


def history(repo, branch: str) -> list[dict]:
    """Commit non-merge của nhánh, mới trước: sha, cha, subject, [(thêm, xóa, path)] (None = nhị phân)."""
    raw = _git(["log", "--no-merges", "--no-renames", "--numstat", "--format=%x01%H%x09%P%x09%s", branch], repo)
    out = []
    for block in raw.split("\x01")[1:]:
        head, *rows = block.splitlines()
        sha, parents, subject = head.split("\t", 2)
        files = [(None if a == "-" else int(a), None if d == "-" else int(d), path)
                 for a, d, path in (r.split("\t") for r in rows if r.count("\t") == 2)]
        out.append({"sha": sha, "parent": parents.split()[0] if parents else None, "subject": subject, "files": files})
    return out


def _changed(repo, parent: str, sha: str, path: str) -> tuple[list[str], list[str]]:
    diff = _git(["diff", "-U0", parent, sha, "--", path], repo).splitlines()
    return ([x[1:] for x in diff if x.startswith("-") and not x.startswith("---")],
            [x[1:] for x in diff if x.startswith("+") and not x.startswith("+++")])


def _ancillary(repo, parent: str, sha: str, path: str) -> str | None:
    """Loại file phụ (không phải thứ người học yêu cầu) hoặc None."""
    if "CHANGELOG" in path.upper():
        return "changelog"
    old, new = _changed(repo, parent, sha, path)
    if path.endswith("sw.js") and all("SW_VERSION" in line for line in old + new):
        return "service-worker cache-version bump"
    bump = lambda lines: sorted(re.sub(r"\?v=[\w.-]+", "?v=", line) for line in lines)  # noqa: E731
    return "?v= cache-bust bump" if old != new and bump(old) == bump(new) else None


def _exists(repo, sha: str, path: str) -> bool:
    return subprocess.run(["git", "cat-file", "-e", f"{sha}:{path}"], cwd=repo, capture_output=True, stdin=subprocess.DEVNULL).returncode == 0


def _patch_id(repo, parent: str, sha: str, gold: list[str]) -> str:
    diff = subprocess.run(["git", "diff", parent, sha, "--", *gold], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL).stdout
    out = subprocess.run(["git", "patch-id", "--stable"], cwd=repo, input=diff, check=True, capture_output=True).stdout.decode()
    return out.split()[0] if out.strip() else sha


def classify(repo, commit: dict, seen: dict) -> tuple[str, str, list[str]]:
    """(mã, lý do, file gold) của 1 commit; mã 'kept' = giữ. Luật chạy theo thứ tự, lý do là luật đầu tiên loại."""
    sha, parent, files = commit["sha"], commit["parent"], commit["files"]
    if not parent:
        return "root", "root commit: không có commit cha để ghim", []
    public = [f for f in files if f[2].startswith("public/")]
    if not public:
        return "no-public", "không chạm file nào dưới public/", []
    if any(a is None for a, _, _ in files):
        return "binary", "có file nhị phân", []
    if len(public) > MAX_FILES:
        return "too-many-files", f"{len(public)} file public/ > {MAX_FILES}", []
    if (lines := sum(a + d for a, d, _ in public)) > MAX_LINES:
        return "too-large", f"{lines} dòng public/ đổi > {MAX_LINES}", []
    gold, aux = [], set()
    for a, d, path in public:
        kind = _ancillary(repo, parent, sha, path)
        if kind:
            aux.add(kind)
        else:
            gold.append((a, d, path))
    if not gold:
        return ("changelog-only" if aux == {"changelog"} else "ancillary-only"), "chỉ có file phụ: " + ", ".join(sorted(aux)), []
    outside = [p for _, _, p in files if not p.startswith("public/")]
    if outside:
        return "outside-public", f"chạm cả file ngoài public/ ({', '.join(outside[:3])}{', …' if len(outside) > 3 else ''}): gold chỉ là một phần thay đổi", []
    paths = [p for _, _, p in gold]
    if data := [p for p in paths if DATA.fullmatch(p)]:
        return "data-file", f"dữ liệu quiz/bài học/cấu hình nội dung: {data[0]}", []
    if other := [p for p in paths if not p.endswith((".js", ".mjs", ".html"))]:
        return "not-js-html", f"không phải js/html: {other[0]}", []
    if moved := [p for p in paths if not (_exists(repo, parent, p) and _exists(repo, sha, p))]:
        return "added-or-deleted", f"thêm/xóa file: {moved[0]} (tier này đo sửa file có sẵn)", []
    pid = _patch_id(repo, parent, sha, paths)
    if pid in seen:
        return "duplicate-patch", f"cùng patch với {seen[pid][:9]}", []
    seen[pid] = sha
    note = f"; bỏ file phụ: {', '.join(sorted(aux))}" if aux else ""
    return "kept", f"{len(paths)} file gold, {lines} dòng public/ đổi{note}", paths


def _show(repo, sha: str, path: str) -> str:
    return subprocess.run(["git", "show", f"{sha}:{path}"], cwd=repo, check=True, capture_output=True,
                          stdin=subprocess.DEVNULL).stdout.decode("utf-8", "replace")


def pin_checkout(root: Path, objects: str, sha: str) -> Path:
    """Repo rỗng-cây có HEAD tách tại `sha`, objects mượn từ `objects` (alternates). Tạo 1 lần, kiểm HEAD mỗi lần dùng."""
    dest = root / DIR / "checkouts" / sha[:12]
    if not (dest / ".git").is_dir():
        dest.mkdir(parents=True, exist_ok=True)
        _git(["init", "-q"], dest)
        (dest / ".git" / "objects" / "info" / "alternates").write_bytes(Path(objects).as_posix().encode() + b"\n")  # LF: git đọc CR là một phần đường dẫn
        _git(["update-ref", "--no-deref", "HEAD", sha], dest)
    if _git(["rev-parse", "HEAD"], dest).strip() != sha:
        raise RuntimeError(f"checkout {dest} không ở commit cha {sha}")
    return dest


def _kind(files: list[str]) -> str:
    return "html" if all(f.endswith(".html") for f in files) else "js" if all(f.endswith((".js", ".mjs")) for f in files) else "mixed"


def build_case(repo, commit: dict, gold: list[str], request: dict) -> dict:
    parent, sha = commit["parent"], commit["sha"]
    return {"id": f"g-{sha[:9]}", "kind": _kind(gold), "style": request["style"], "files": gold, "title": request["title"],
            "detail": request["detail"], "verify": request["verify"], "base_sha": parent, "gold_sha": sha, "subject": commit["subject"],
            "gold_lines": {f: eval_recall.gold_lines(_show(repo, parent, f), _show(repo, sha, f)) for f in gold},
            "gold_diff": _git(["diff", "-U3", parent, sha, "--", *gold], repo)}


def build(args) -> int:
    root, repo = Path(args.root), Path(args.repo)
    out = root / DIR
    out.mkdir(parents=True, exist_ok=True)
    requests = json.loads((out / "requests.json").read_text(encoding="utf-8")) if (out / "requests.json").exists() else {}
    commits, seen, kept, table = history(repo, args.branch), {}, [], []
    for commit in commits:
        code, why, gold = classify(repo, commit, seen)
        table.append((commit["sha"][:9], "kept" if code == "kept" else "dropped", code, why, commit["subject"]))
        if code == "kept":
            kept.append((commit, gold))
    (out / "cleaning.tsv").write_text("".join("\t".join(row) + "\n" for row in table), encoding="utf-8")
    pool = sum(1 <= len(p) <= MAX_FILES and sum(a + d for a, d, _ in p) <= MAX_LINES
               for p in ([f for f in c["files"] if f[2].startswith("public/") and f[0] is not None] for c in commits))
    drops: dict[str, int] = {}
    for _, status, code, _, _ in table:
        drops[code] = drops.get(code, 0) + (status == "dropped")
    print(f"[git-build] {len(commits)} commit non-merge ({pool} trong ô 1-3 file public/ ≤ {MAX_LINES} dòng theo đếm thô); giữ {len(kept)}; "
          f"loại {sum(drops.values())}: " + ", ".join(f"{k}={v}" for k, v in sorted(drops.items()) if v) + f"; lý do từng commit: {out / 'cleaning.tsv'}")
    if missing := [c["sha"][:9] for c, _ in kept if c["sha"][:9] not in requests]:
        print(f"[git-build] thiếu chữ request (đóng băng ở {out / 'requests.json'}) cho: {' '.join(missing)}", file=sys.stderr)
        return 2
    objects = (repo / _git(["rev-parse", "--git-common-dir"], repo).strip()).resolve() / "objects"
    cases = [build_case(repo, c, gold, requests[c["sha"][:9]]) for c, gold in kept]
    for case in cases:
        pin_checkout(root, str(objects), case["base_sha"])
    (out / "cases.json").write_bytes(json.dumps(cases, ensure_ascii=False, indent=2).encode("utf-8"))
    (out / "meta.json").write_text(json.dumps({"repo": str(repo), "branch": args.branch, "objects": str(objects),
                                               "head": commits[0]["sha"] if commits else None}, indent=2), encoding="utf-8")
    return 0


def load(root: Path) -> tuple[list[dict], dict]:
    path = root / DIR / "cases.json"
    if not path.is_file():
        return [], {}
    return json.loads(path.read_text(encoding="utf-8")), json.loads((root / DIR / "meta.json").read_text(encoding="utf-8"))


def recall_cases(root: Path) -> list[dict]:
    """Case của git tier cho bộ đo recall (request = chữ người học đóng băng; không chạm repo gốc)."""
    cases, meta = load(root)
    return [{"corpus": DIR, "id": c["id"], "groups": {"kind": c["kind"], "style": c["style"]},
             "request": {"subject": c["title"], "body": c["detail"]}, "detail": c["detail"],
             "subtasks": [{"title": c["title"], "file": f, "size": "small", "verify": c["verify"]} for f in c["files"]],
             "gold": c["gold_lines"], "source": str(pin_checkout(root, meta["objects"], c["base_sha"]))} for c in cases]


# ── lớp 1 ──
_SCRIPT = re.compile(r"<script(?P<attrs>[^>]*)>(?P<body>.*?)</script\s*>", re.S | re.I)
_TYPE = re.compile(r"""type\s*=\s*["']?([^"'\s>]*)""", re.I)


def _scripts(file: str, text: str) -> list[str]:
    """Đoạn JS cần kiểm cú pháp: cả file .js/.mjs, hoặc các <script> nội tuyến (không src, không phải template/json) của .html."""
    if file.endswith((".js", ".mjs")):
        return [text]
    out = []
    for m in _SCRIPT.finditer(text):
        kind = _TYPE.search(m["attrs"])
        if "src=" not in m["attrs"].lower() and (not kind or kind.group(1).lower() in ("", "module") or "javascript" in kind.group(1).lower()):
            out.append(m["body"])
    return out


def _broken(file: str, text: str) -> int:
    return sum(static_check.syntax_error(body) is not None for body in _scripts(file, text) if body.strip())


def layer1(files: dict, base: dict) -> bool:
    """Mọi file gold đã đổi và cú pháp JS không hỏng thêm so với base (cổng 3 đã bảo đảm edits áp được)."""
    return all(files[f] != base[f] and ((now := _broken(f, files[f])) == 0 or now <= _broken(f, base[f])) for f in base)


def case_record(case: dict, root: Path, meta: dict) -> dict:
    """Case git → bản ghi cho eval_gold.run_case (nhiều subtask, checkout ghim ở commit cha)."""
    checkout = pin_checkout(root, meta["objects"], case["base_sha"])
    base = {f: _show(checkout, "HEAD", f) for f in case["files"]}
    return {"subtasks": [{"title": case["title"], "file": f, "size": "small", "verify": case["verify"]} for f in case["files"]],
            "detail": case["detail"], "checkout": str(checkout), "oracle": lambda files: layer1(files, base)}


def register(subs) -> None:
    import eval_run
    root = os.environ.get("AI_BOARD_EVAL_DIR") or str(eval_run.DEFAULT_ROOT)
    parser = subs.add_parser("git-build", help="lọc commit sạch → corpus-git (không model)")
    parser.add_argument("--repo", default=str(ROOT))
    parser.add_argument("--branch", default="main")
    parser.add_argument("--root", default=root)
    parser.set_defaults(handler=build, no_model=True)
    parser = subs.add_parser("git", help="chạy corpus-git: cổng 3 + lớp 1 (fast tier)")
    parser.add_argument("--repeats", type=int, default=3)
    parser.add_argument("--budget-minutes", type=float)
    parser.add_argument("--baseline", help="report.json của run mốc (cùng tier + nguồn)")
    parser.add_argument("--model", help="mặc định: model cổng 3 đang cấu hình")
    parser.add_argument("--judge", action="store_true", help="thêm lớp 3: giám khảo mềm so candidate với gold diff (báo riêng)")
    parser.add_argument("--judge-model", default=eval_judge.JUDGE_MODEL, help="ghim; phải khác họ với model sinh")
    parser.add_argument("--root", default=root)
    parser.set_defaults(handler=run)


def run(args, deps, source) -> int:
    """Cùng vòng lặp resume/budget như `quick`; corpus = corpus-git, nhãn lớp 1."""
    import eval_run
    root = Path(args.root)
    cases, meta = load(root)
    if not cases:
        print(f"[git] chưa có {root / DIR / 'cases.json'}: chạy git-build trước", file=sys.stderr)
        return 2
    if args.baseline and not Path(args.baseline).is_file():
        print(f"[git] không thấy mốc {args.baseline}", file=sys.stderr)
        return 2
    baseline = json.loads(Path(args.baseline).read_text(encoding="utf-8")) if args.baseline else None
    model = args.model or deps.models.gate3_model
    if args.judge and eval_judge.family(args.judge_model) == eval_judge.family(model):
        print(f"[git] giám khảo {args.judge_model} cùng họ với model sinh {model}: chọn model khác họ", file=sys.stderr)
        return 2
    run_dir = root / "runs" / "git"
    run_dir.mkdir(parents=True, exist_ok=True)
    info = {"tier": "git-b", "source": source, "seed": DIR, "repeats": args.repeats, "model": model,
            "corpus_sha": hashlib.sha256((root / DIR / "cases.json").read_bytes()).hexdigest()}
    meta_path = run_dir / "run.json"
    if meta_path.exists() and {k: json.loads(meta_path.read_text(encoding="utf-8")).get(k) for k in info} != info:
        print(f"[git] {run_dir} đã có run khác cấu hình (corpus/repeats/model); đổi --root", file=sys.stderr)
        return 2
    done = eval_run.load_done(run_dir / "results.jsonl")
    started, total, cut_short = time.monotonic(), len(cases) * args.repeats, False
    meta_path.write_text(json.dumps({**info, "status": "running"}, indent=2), encoding="utf-8")
    records = {}
    with (run_dir / "results.jsonl").open("a", encoding="utf-8") as out:
        for repeat in range(1, args.repeats + 1):
            for case in cases:
                if (case["id"], repeat) in done:
                    continue
                if args.budget_minutes is not None and time.monotonic() - started >= args.budget_minutes * 60:
                    cut_short = True
                    break
                record = records.setdefault(case["id"], case_record(case, root, meta))
                row = {**eval_run.run_case(case["id"], record, model, deps), "kind": case["kind"], "style": case["style"],
                       "repeat": repeat, "base_sha": case["base_sha"]}
                done[(case["id"], repeat)] = row
                out.write(json.dumps(row, ensure_ascii=False) + "\n")
                out.flush()
            if cut_short:
                break
    rows = [done[(c["id"], r)] for r in range(1, args.repeats + 1) for c in cases if (c["id"], r) in done]
    meta_path.write_text(json.dumps({**info, "status": "cut_short" if cut_short else "complete"}, indent=2), encoding="utf-8")
    rep = report(info, cases, rows, total, cut_short, baseline)
    text = eval_run.render(rep) + "\n" + "\n".join(f"{k}: {v}" for k, v in LAYERS.items())
    if args.judge:  # lớp 3: kết quả mềm báo riêng, không đụng funnel/groups/verdict của lớp 1
        try:
            judged = eval_judge.judge_all(deps, args.judge_model, cases, rows, run_dir / "judge.jsonl")
        except ValueError as error:
            print(f"[git] {error}", file=sys.stderr)
            return 2
        rep["soft_judge"] = eval_judge.summarize(args.judge_model, cases, rows, judged, eval_run.wilson)
        eval_judge.write_disagreements(rep["soft_judge"], run_dir / "disagreements.txt")
        text += "\n" + "\n".join(eval_judge.lines(rep["soft_judge"]))
    (run_dir / "report.json").write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    (run_dir / "report.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    return {"reject": 1, "incomparable": 2}.get(rep["verdict"]["status"], 0)


def report(info: dict, cases: list[dict], rows: list[dict], total: int, cut_short: bool, baseline: dict | None) -> dict:
    """build_report của quick + nhãn tier (b), nhóm theo style, funnel đặt tên lớp 1."""
    import eval_run
    rep = eval_run.build_report(info, cases, rows, total, cut_short, baseline)
    rep["label"] = "GIT TIER (b)"
    rep["tier_label"] = "tier (b), fast: lớp 1 tất định; không trộn vào ship rate chính thức"
    rep["funnel"][1]["stage"] = "layer1"
    rep["layers"] = LAYERS
    for style in sorted({r["style"] for r in rows}):
        rep["groups"][f"style={style}"] = eval_run.group_stats([r for r in rows if r["style"] == style])
    return rep
