"""Bộ đo theo nhóm (feature-folders ticket 12): loại (ui | logic | feature) × trường (it | pharmacy) ×
cách mô tả (named: có tên riêng/ngoặc | plain: lời thường). Chỉ số tất định chạy trong CI: cổng 1 có nhắm
đúng file không (targets, hoặc trang mẫu với loại feature); lượt sửa tiếp trong folder (type=followup) phải nhắm
file folder sở hữu và không bị coi là chức năng mới; luật độ rõ (clarity-rules.json) không được bắt yêu cầu đã rõ
phải hỏi lại (clarity_fp, thấp là tốt) và phải bắt yêu cầu mơ hồ (clarity_miss). Quy tắc nhận thay đổi: không nhóm
nào tụt quá MAX_DROP điểm so với mốc eval/strata-baseline.json (tests/test_eval_strata.py); mốc ghi kèm mã cấu hình.

    python eval_strata.py                 # in bảng theo nhóm
    python eval_strata.py --write-baseline  # ghi mốc mới (chỉ khi thay đổi đã được chấp nhận)
    python eval_strata.py --live          # thêm cổng 1→2.5 với model thật: đạt/chặn, GPU-s, độ dài tầng
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import context  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
BASELINE = Path(__file__).resolve().parent / "eval" / "strata-baseline.json"
MAX_DROP = 10.0  # điểm %: 1 nhóm tụt hơn mức này so với mốc thì thay đổi không được nhận

IT_PAGE = "[Trang: 💻 Trường Công nghệ thông tin] /school.html?domain=it"
# Mỗi ô 1 kịch bản; expect = file nào cũng được tính là nhắm đúng (file thật ở HEAD).
SCENARIOS = [
    {"id": "it-ui-named", "type": "ui", "school": "it", "style": "named",
     "subject": "Thẻ IT Game Master che mất nút trên điện thoại",
     "body": f"{IT_PAGE}\nThẻ thành tựu IT Game Master hiện ra đè lên nút con cú, không bấm được",
     "expect": ["public/js/engine/path-renderer.js"]},
    {"id": "it-ui-plain", "type": "ui", "school": "it", "style": "plain",
     "subject": "nút quay lại khuôn viên trường nhỏ quá",
     "body": "[Trang: Sân chơi web] /it-web-playground.html\nnút quay lại khuôn viên trường ở góc trên nhỏ quá khó bấm",
     "expect": ["public/it-web-playground.html"]},
    {"id": "it-logic-named", "type": "logic", "school": "it", "style": "named",
     "subject": "Bảng Nhiệm vụ hôm nay không cập nhật số việc đã xong",
     "body": f"{IT_PAGE}\nlàm xong việc rồi mà ô Nhiệm vụ hôm nay vẫn hiện 0",
     "expect": ["public/js/engine/path-renderer.js", "public/js/engagement-hud.js"]},
    {"id": "it-logic-plain", "type": "logic", "school": "it", "style": "plain",
     "subject": "bấm bắt đầu học mà không có gì xảy ra",
     "body": f"{IT_PAGE}\nlần đầu vào trang bấm bắt đầu học không chuyển sang bước tiếp",
     "expect": ["public/js/onboarding-60s.js"]},
    {"id": "it-feature-named", "type": "feature", "school": "it", "style": "named",
     "subject": "Trò đoán từ khoá lập trình", "body": f"{IT_PAGE}\nôn từ khoá khi học lập trình, giống trò giải mật mã CTF",
     "expect": ["public/it-cipher-ctf.html", "public/it-web-playground.html", "public/it-code-lab.html"]},
    {"id": "it-feature-plain", "type": "feature", "school": "it", "style": "plain",
     "subject": "trò chơi ôn từ khoá lập trình cho lớp", "body": f"{IT_PAGE}\ncả lớp thi đoán từ khoá lập trình cho vui",
     "expect": ["public/it-cipher-ctf.html", "public/it-web-playground.html", "public/it-code-lab.html"]},
    {"id": "ph-ui-named", "type": "ui", "school": "pharmacy", "style": "named",
     "subject": "Nút \"Bắt đầu pha chế\" bị che trên điện thoại",
     "body": "[Trang: Phòng pha chế] /compounding-lab.html\nnút Bắt đầu pha chế bị che mất một nửa",
     "expect": ["public/compounding-lab.html"]},
    {"id": "ph-ui-plain", "type": "ui", "school": "pharmacy", "style": "plain",
     "subject": "chữ ở ô đơn thuốc hiện tại mờ quá",
     "body": "[Trang: Ca lâm sàng SOAP] /duoc-soap.html\nchữ trong khung đơn thuốc hiện tại mờ, khó đọc",
     "expect": ["public/duoc-soap.html"]},
    {"id": "ph-logic-named", "type": "logic", "school": "pharmacy", "style": "named",
     "subject": "Nút Chọn bài pha chế không mở danh sách",
     "body": "[Trang: Phòng pha chế] /compounding-lab.html\nbấm Chọn bài pha chế thì không hiện danh sách bài",
     "expect": ["public/compounding-lab.html"]},
    {"id": "ph-logic-plain", "type": "logic", "school": "pharmacy", "style": "plain",
     "subject": "chọn đơn pha chế xong không vào được bài",
     "body": "[Trang: Bào chế] /bao-che-hub.html\nchọn một đơn pha chế rồi mà không vào được bài",
     "expect": ["public/bao-che-hub.html"]},
    {"id": "ph-feature-named", "type": "feature", "school": "pharmacy", "style": "named",
     "subject": "Thẻ ghi nhớ tên hoạt chất", "body": "lật thẻ để học tên hoạt chất, giống Flashcards SRS",
     "expect": ["public/srs.html", "public/hoc-thong-minh.html"]},
    {"id": "ph-feature-plain", "type": "feature", "school": "pharmacy", "style": "plain",
     "subject": "trò chơi luyện cân thuốc", "body": "cho sinh viên dược luyện cân hoạt chất trước khi pha chế",
     "expect": ["public/compounding-lab.html", "public/bao-che-hub.html", "public/dispense.html"]},
]

def _folder(school: str, title: str, purpose: str, flow: str, owned: str, turns: list[tuple[str, str]]) -> list[dict]:
    """Lượt sửa tiếp của 1 folder chức năng (draft đã có ở `owned`), dựng giống store.folderBrief."""
    brief = f"Chức năng: {title}\nMục đích: {purpose}\nLuồng người dùng: {flow}\nFile sở hữu: {owned}"
    out, recent = [], []
    for i, (style, text) in enumerate(turns):
        out.append({"id": f"{owned.split('/')[-1][:-5]}-{i + 1}", "type": "followup", "school": school, "style": style,
                    "subject": text, "body": text, "expect": [owned], "folder_brief": brief, "owned_files": [owned],
                    "folder_recent": "\n".join(recent[-2:])})
        recent.append(f"- {text}")
    return out


# 5 folder chức năng × 3–4 lượt sửa viết sẵn (ticket 12). File sở hữu là trang draft chưa có ở HEAD.
FOLLOWUPS = [
    *_folder("it", "Trò đoán từ khoá lập trình", "ôn từ khoá khi học lập trình", "xem gợi ý, gõ từ, được chấm điểm",
             "public/it-tu-khoa.html", [("named", "đổi màu nút Đoán sang xanh lá"),
                                        ("plain", "thêm đồng hồ đếm ngược 30 giây mỗi câu"),
                                        ("plain", "hết câu thì hiện bảng điểm cả lượt"),
                                        ("plain", "chữ gợi ý nhỏ quá trên điện thoại")]),
    *_folder("it", "Bảng xếp hạng thi code cả lớp", "cả lớp thi giải bài code", "nộp bài, xem thứ hạng theo điểm",
             "public/it-xep-hang.html", [("plain", "thêm cột thời gian nộp bài"),
                                         ("plain", "tô vàng người đứng đầu bảng"),
                                         ("named", "nút \"Quay lại khuôn viên\" bị che mất")]),
    *_folder("pharmacy", "Thẻ ghi nhớ tên hoạt chất", "học tên hoạt chất", "lật thẻ, tự đánh giá thuộc hay chưa",
             "public/the-hoat-chat.html", [("plain", "lật thẻ chậm lại một chút"),
                                           ("named", "thêm nút Xáo trộn thẻ"),
                                           ("plain", "hiện số thẻ đã thuộc ở góc trên"),
                                           ("plain", "chữ mặt sau bị tràn ra ngoài thẻ")]),
    *_folder("pharmacy", "Luyện cân thuốc", "luyện cân hoạt chất trước khi pha chế", "đọc đơn, cân, được báo đúng sai",
             "public/luyen-can-thuoc.html", [("plain", "cho nhập số lẻ như 0.5 gam"),
                                             ("plain", "báo sai khi cân lệch quá 5%"),
                                             ("plain", "thêm âm thanh khi cân đúng")]),
    *_folder("pharmacy", "Đố vui tương tác thuốc", "ôn tương tác thuốc", "đọc câu hỏi, chọn đáp án, xem giải thích",
             "public/do-vui-tuong-tac.html", [("plain", "thêm 5 câu về warfarin"),
                                              ("plain", "hiện giải thích sau mỗi câu trả lời"),
                                              ("named", "nút Tiếp theo không bấm được trên điện thoại")]),
]
# Yêu cầu mơ hồ thật (luật độ rõ PHẢI hỏi lại) — chỉ dùng cho clarity_miss.
VAGUE = [
    {"id": "it-vague-plain", "school": "it", "style": "plain", "subject": "làm trang này đẹp hơn", "body": f"{IT_PAGE}\n"},
    {"id": "it-vague-named", "school": "it", "style": "named", "subject": "sửa lại cái này", "body": f"{IT_PAGE}\ncái này trông kỳ"},
    {"id": "ph-vague-plain", "school": "pharmacy", "style": "plain", "subject": "cải thiện phòng pha chế",
     "body": "[Trang: Phòng pha chế] /compounding-lab.html\n"},
    {"id": "ph-vague-named", "school": "pharmacy", "style": "named", "subject": "trang Bào chế chưa ổn", "body": "chỗ đó lỗi"},
]
STRATA = ("type", "school", "style")


def _exemplars(ctx: dict) -> list[str]:
    for line in ctx["text"].splitlines():
        if line.startswith("trang mẫu gần nhất"):
            return [p.strip() for p in line.split(":", 1)[1].split(",")]
    return []


def score(scenario: dict, source=REPO, sha: str = "HEAD") -> dict:
    """Cổng 1 tất định (không model): nhắm đúng file = targets hoặc trang mẫu chứa 1 file trong expect.
    Lượt sửa tiếp: thêm điều kiện skill không phải new-feature (draft đã có, đây là sửa)."""
    request = {"subject": scenario["subject"], "body": scenario["body"], "domain": scenario["school"],
               "type": "feature" if scenario["type"] == "feature" else "other",
               **{k: scenario[k] for k in ("folder_brief", "folder_recent", "owned_files") if k in scenario}}
    ctx = context.build_context(1, request, None, source, sha, memory_path=Path("nope.jsonl"))
    picked = [*ctx["targets"], *_exemplars(ctx)]
    hit = any(f in picked for f in scenario["expect"])
    if scenario["type"] == "followup":
        hit = hit and ctx["skill"] != "new-feature"
    return {"id": scenario["id"], "hit": hit, "picked": picked[:4], "skill": ctx["skill"], "tiers": ctx.get("tiers")}


def clarity(scenarios: list[dict]) -> dict[str, bool]:
    """{id: luật độ rõ đòi hỏi lại?} — gọi đúng checkClarity của server (node), 1 process cho cả lô."""
    script = ("import {checkClarity} from './server/ai-board/clarity-rules.js';"
              "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{"
              "const out={};for(const x of JSON.parse(s))out[x.id]=checkClarity(x.subject,x.body).needed;"
              "process.stdout.write(JSON.stringify(out));});")
    items = [{"id": x["id"], "subject": x["subject"], "body": x["body"]} for x in scenarios]
    done = subprocess.run(["node", "--input-type=module", "-e", script], cwd=REPO, input=json.dumps(items),
                          capture_output=True, text=True, encoding="utf-8", check=True)
    return json.loads(done.stdout)


def clarity_strata(asked: dict[str, bool]) -> dict[str, float]:
    """clarity_fp: % yêu cầu ui/logic đã rõ bị bắt hỏi lại; clarity_miss: % yêu cầu mơ hồ lọt qua (theo trục)."""
    rows = [(s, asked[s["id"]], False) for s in SCENARIOS if s["type"] in ("ui", "logic")]
    rows += [(v, asked[v["id"]], True) for v in VAGUE]
    buckets: dict[str, list[bool]] = defaultdict(list)
    for item, needed, vague in rows:
        name = "clarity_miss" if vague else "clarity_fp"
        buckets[name].append(needed != vague)
        for axis in ("school", "style"):
            buckets[f"{name} {axis}={item[axis]}"].append(needed != vague)
    return {k: round(100 * sum(v) / len(v), 1) for k, v in sorted(buckets.items())}


def config_sha() -> dict[str, str]:
    """Mã git của cấu hình ảnh hưởng kết quả: kết quả chỉ so được khi biết đo trên cấu hình nào."""
    files = ["ai-board/harness/skills/skills.lock.json", "ai-board/harness/prompts/prompts.lock.json",
             "ai-board/harness/retrieval_weights.json",
             "server/ai-board/contract.json", "server/ai-board/clarity-rules.json"]
    out = subprocess.run(["git", "hash-object", *files], cwd=REPO, capture_output=True, text=True, check=True).stdout
    return {Path(f).name: h[:10] for f, h in zip(files, out.split())}


def by_stratum(results: list[dict]) -> dict[str, float]:
    """{"type=ui": %đúng, …} cho mỗi giá trị của mỗi trục."""
    buckets: dict[str, list[bool]] = defaultdict(list)
    index = {s["id"]: s for s in [*SCENARIOS, *FOLLOWUPS]}
    for r in results:
        for axis in STRATA:
            buckets[f"{axis}={index[r['id']][axis]}"].append(r["hit"])
    return {k: round(100 * sum(v) / len(v), 1) for k, v in sorted(buckets.items())}


def regressions(current: dict[str, float], baseline: dict[str, float], max_drop: float = MAX_DROP) -> list[str]:
    """Nhóm tụt quá max_drop điểm so với mốc (nhóm mới không có mốc thì bỏ qua). clarity_* là tỉ lệ sai: tăng = tụt."""
    worse = lambda k, v: (v - baseline[k]) if k.startswith("clarity_") else (baseline[k] - v)  # noqa: E731
    return [f"{k}: {baseline[k]} → {v}" for k, v in current.items()
            if isinstance(baseline.get(k), (int, float)) and worse(k, v) > max_drop]


def measure() -> tuple[list[dict], dict[str, float]]:
    """Chạy toàn bộ bộ đo tất định: (kết quả từng kịch bản, bảng theo nhóm)."""
    results = [score(s) for s in [*SCENARIOS, *FOLLOWUPS]]
    return results, {**by_stratum(results), **clarity_strata(clarity([*SCENARIOS, *VAGUE]))}


def _live(scenario: dict) -> dict:
    """Cổng 1→2.5 với model thật (cần env model): chặn/đạt, GPU-s. Không chạy trong CI."""
    from worker import HarnessPlanner, PlanBlockedError
    planner = HarnessPlanner(source=REPO)
    snapshot = {"request": {"id": 0, "title": scenario["subject"], "detail": scenario["body"], "domain": scenario["school"],
                            "type": "feature" if scenario["type"] == "feature" else "other"}, "ticket": {}}
    started = time.monotonic()
    try:
        plan, units = planner(snapshot)
        return {"planned": True, "units": units, "files": [s["allowed_scope"][0] for s in plan["steps"]],
                "wall_s": round(time.monotonic() - started, 1)}
    except PlanBlockedError as error:
        return {"planned": False, "reason": error.detail.get("reason"), "wall_s": round(time.monotonic() - started, 1)}


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--write-baseline", action="store_true")
    parser.add_argument("--live", action="store_true")
    args = parser.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")
    results, strata = measure()
    for r in results:
        print(f"{'✓' if r['hit'] else '✗'} {r['id']:<22} {r['skill']:<16} {', '.join(r['picked'])}")
    print(json.dumps(strata, ensure_ascii=False, indent=1))
    config = config_sha()
    print("cấu hình:", json.dumps(config))
    if args.live:
        from dotenv import load_dotenv
        from main import ENV_FILE
        load_dotenv(ENV_FILE)
        live = {s["id"]: _live(s) for s in SCENARIOS}
        out = REPO / "ai-board" / "memory" / "eval" / f"strata-{time.strftime('%Y%m%d-%H%M%S')}.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps({"config": config, "strata": strata, "results": results, "live": live},
                                  ensure_ascii=False, indent=1),
                       encoding="utf-8")
        print(f"live → {out}")
    if args.write_baseline:
        BASELINE.parent.mkdir(parents=True, exist_ok=True)
        BASELINE.write_text(json.dumps({"_config": config, **strata}, ensure_ascii=False, indent=1) + "\n",
                            encoding="utf-8")
        print(f"baseline → {BASELINE}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
