"""Chọn skill tất định cho 1 prompt: ưu tiên, trùng topic, số lượng, ngân sách token. Không gọi model."""
from dataclasses import dataclass

SEPARATOR_TOKENS = 2  # khớp bộ đếm ghép skill trong system (default_skills.select)


@dataclass(frozen=True)
class Candidate:
    name: str
    priority: int  # nhỏ thắng
    reason: str
    tokens: int = 0
    topic: str | None = None
    required: bool = False  # vượt budget thì raise, không bỏ im lặng
    counted: bool = True  # False: không tính vào số lượng/ngân sách (biến thể thử nghiệm)
    enabled: bool = True
    payload: object = None


def choose(candidates, max_skills=None, max_tokens=None):
    """(chosen Candidate list, {'selected': [{name, reason}], 'dropped': [{name, reason}]}).

    Thứ tự theo (priority, name). Bỏ: disabled, trùng topic với đã chọn, vượt max_skills, vượt max_tokens.
    """
    chosen, dropped, used = [], [], 0
    for c in sorted(candidates, key=lambda c: (c.priority, c.name)):
        if not c.enabled:
            dropped.append({'name': c.name, 'reason': 'disabled'})
            continue
        owner = next((k.name for k in chosen if c.topic and k.topic == c.topic), None)
        if owner:
            dropped.append({'name': c.name, 'reason': f'overlaps {owner}'})
            continue
        if c.counted:
            counted = sum(1 for k in chosen if k.counted)
            join = SEPARATOR_TOKENS if counted else 0
            if max_skills is not None and counted >= max_skills:
                dropped.append({'name': c.name, 'reason': 'max_per_prompt'})
                continue
            if max_tokens is not None and used + join + c.tokens > max_tokens:
                if c.required:
                    raise ValueError(f'{c.name} exceeds skill token budget')
                dropped.append({'name': c.name, 'reason': 'max_tokens_per_prompt'})
                continue
            used += join + c.tokens
        chosen.append(c)
    report = {'selected': [{'name': c.name, 'reason': c.reason} for c in chosen], 'dropped': dropped}
    return chosen, report
