"""Complexity Budget — trần cứng cho 1 lần chạy skill. Chạm trần: dừng, ghi
outcome='budget_exhausted', không bao giờ im lặng báo xong."""
from __future__ import annotations

import os
import time
from dataclasses import dataclass, field

# Cộng dồn qua các lần resume (skill_proposals.budget_json), không reset —
# đây là cái chặn loop vô hạn ăn GPU máy dùng chung.
CAPS = ("model_calls", "tool_calls", "tokens", "retries")
# retries chỉ chặn retry tiếp theo (worker tự kiểm), không kết thúc cả lượt chạy.
RUN_CAPS = ("model_calls", "tool_calls", "tokens")


@dataclass
class Budget:
    max_model_calls: int = 40
    max_tool_calls: int = 200
    max_tokens: int = 200_000
    max_retries: int = 3
    max_wall_clock_s: float = 900.0

    model_calls: int = 0
    tool_calls: int = 0
    tokens: int = 0
    retries: int = 0
    # Giây đã tiêu ở các lần chạy TRƯỚC. Wall-clock phải cộng dồn qua resume như
    # mọi cap khác — nếu reset mỗi lần thì một skill fail rồi resume 20 lần được
    # 20 × max_wall_clock_s GPU mà budget không bao giờ báo chạm trần.
    elapsed_before_s: float = 0.0
    started_at: float = field(default_factory=time.monotonic)

    @classmethod
    def from_env(cls, env: dict | None = None) -> "Budget":
        """Đọc BUDGET_MAX_* từ env, thiếu thì lấy mặc định."""
        env = os.environ if env is None else env

        def num(key, default, cast):
            raw = env.get(f"BUDGET_MAX_{key.upper()}")
            return default if raw in (None, "") else cast(raw)

        return cls(
            max_model_calls=num("model_calls", 40, int),
            max_tool_calls=num("tool_calls", 200, int),
            max_tokens=num("tokens", 200_000, int),
            max_retries=num("retries", 3, int),
            max_wall_clock_s=num("wall_clock_s", 900.0, float),
        )

    @classmethod
    def restore(cls, snapshot: dict) -> "Budget":
        """Dựng lại từ skill_proposals.budget_json — resume cộng dồn, không reset."""
        b = cls(**{k: v for k, v in snapshot.items() if k.startswith("max_")})
        for cap in CAPS:
            setattr(b, cap, snapshot.get(cap, 0))
        b.elapsed_before_s = float(snapshot.get("elapsed_s", 0.0))
        return b

    @property
    def elapsed_s(self) -> float:
        """Tổng giây đã tiêu, gồm cả các lần chạy trước."""
        return self.elapsed_before_s + (time.monotonic() - self.started_at)

    def exhausted(self) -> str | None:
        """Tên cap đã chạm, None nếu còn chỗ."""
        if self.elapsed_s >= self.max_wall_clock_s:
            return "wall_clock_s"
        for cap in RUN_CAPS:
            if getattr(self, cap) >= getattr(self, f"max_{cap}"):
                return cap
        return None

    def tick(self) -> bool:
        """Còn ngân sách để đi tiếp 1 bước? Không tính phí, chỉ kiểm tra."""
        return self.exhausted() is None

    def spend(self, cap: str, n: int = 1) -> bool:
        """Ghi nợ n đơn vị cap. False nếu ghi xong là chạm/vượt trần."""
        if cap not in CAPS:
            raise ValueError(f"cap lạ: {cap}")
        setattr(self, cap, getattr(self, cap) + n)
        return self.exhausted() is None

    def snapshot(self) -> dict:
        out = {cap: getattr(self, cap) for cap in CAPS}
        out.update(
            max_model_calls=self.max_model_calls,
            max_tool_calls=self.max_tool_calls,
            max_tokens=self.max_tokens,
            max_retries=self.max_retries,
            max_wall_clock_s=self.max_wall_clock_s,
            elapsed_s=round(self.elapsed_s, 3),
            exhausted=self.exhausted(),
        )
        return out
