"""Vision advisory vs owner labels: agreement and balanced accuracy on decided cases."""
import json

from evaluation import vision_advisory_eval as ev


def adv(overall):
    return {"status": "ok", "overall": overall, "answers": []}


def test_scores_decided_cases_and_counts_the_rest(tmp_path):
    labels = tmp_path / "labels.jsonl"
    labels.write_text("\n".join(json.dumps(r) for r in [
        {"case_id": "a", "draft_label": "pass"}, {"case_id": "b", "draft_label": "pass"},
        {"case_id": "c", "draft_label": "fail"}, {"case_id": "d", "draft_label": "fail"},
        {"case_id": "e", "draft_label": "pass"}, {"case_id": "f", "draft_label": "pass"}]), encoding="utf-8")
    trials = tmp_path / "trials.json"
    trials.write_text(json.dumps([
        {"case_id": "a", "vision_advisory": adv("pass")}, {"case_id": "b", "vision_advisory": adv("fail")},
        {"case_id": "c", "vision_advisory": adv("fail")}, {"case_id": "d", "vision_advisory": adv("pass")},
        {"case_id": "e", "vision_advisory": adv("unsure")},
        {"case_id": "f", "vision_advisory": {"status": "unavailable", "reason": "x"}}]), encoding="utf-8")

    out = ev.score(ev.load(trials), ev.load(labels))

    assert out["decided"] == 4 and out["agreement"] == 0.5
    assert out["balanced_accuracy"] == 0.5
    assert out["unsure"] == 1 and out["unavailable"] == 1 and out["unlabeled"] == 0


def test_balanced_accuracy_not_agreement_when_classes_skewed():
    labels = [{"case_id": str(i), "label": "pass"} for i in range(9)] + [{"case_id": "x", "label": "fail"}]
    trials = [{"case_id": str(i), "vision_advisory": adv("pass")} for i in range(9)] + [
        {"case_id": "x", "vision_advisory": adv("pass")}]
    out = ev.score(trials, labels)
    assert out["agreement"] == 0.9 and out["balanced_accuracy"] == 0.5
