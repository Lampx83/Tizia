"""Llama Prompt Guard 2 shadow scorer (AI_BOARD_PROMPT_GUARD=shadow): p(malicious) per field, never blocks."""
from __future__ import annotations

import json
import math
import threading
import time
from pathlib import Path

from settings import get_settings

WINDOW = 512  # model max positions, special tokens included
OVERLAP = 64
MAX_SEGMENTS = 16
THRESHOLD = 0.5
_lock = threading.Lock()
_loaded: dict[str, object] = {}


def segments(ids: list[int], size: int = WINDOW - 2, overlap: int = OVERLAP,
             cap: int = MAX_SEGMENTS) -> tuple[list[list[int]], bool]:
    """Overlapping windows of token ids; (windows[:cap], truncated)."""
    windows = [ids[start:start + size] for start in range(0, max(len(ids) - overlap, 1), size - overlap)]
    return windows[:cap], len(windows) > cap


def malicious_indices(config: dict) -> list[int]:
    """Class indices summed as malicious, from config.json id2label; binary LABEL_0/1 → [1]."""
    labels = {int(k): str(v).upper() for k, v in (config.get("id2label") or {}).items()}
    named = [i for i, name in sorted(labels.items()) if "BENIGN" not in name and not name.startswith("LABEL_")]
    return named or [max(labels or {1: ""})]


def _softmax(logits) -> list[float]:
    top = max(logits)
    exps = [math.exp(x - top) for x in logits]
    return [x / sum(exps) for x in exps]


class _Onnx:
    """onnxruntime + tokenizers (tokenizer.json); smallest *.onnx in the dir, so an int8 export wins."""

    def __init__(self, path: Path):
        import numpy as np
        import onnxruntime as ort
        from tokenizers import Tokenizer
        files = sorted(path.rglob("*.onnx"), key=lambda p: p.stat().st_size)
        if not files:
            raise FileNotFoundError("no .onnx file")
        self.np, self.tok = np, Tokenizer.from_file(str(path / "tokenizer.json"))
        self.cls, self.sep = self.tok.token_to_id("[CLS]"), self.tok.token_to_id("[SEP]")
        if self.cls is None or self.sep is None:
            raise ValueError("tokenizer has no [CLS]/[SEP]")
        self.bad = malicious_indices(json.loads((path / "config.json").read_text(encoding="utf-8")))
        options = ort.SessionOptions()
        options.intra_op_num_threads = 2
        self.session = ort.InferenceSession(str(files[0]), options, providers=["CPUExecutionProvider"])
        self.inputs = {i.name for i in self.session.get_inputs()}

    def encode(self, text: str) -> list[int]:
        return self.tok.encode(text, add_special_tokens=False).ids

    def score(self, windows: list[list[int]]) -> list[float]:
        out = []
        for window in windows:
            ids = self.np.array([[self.cls, *window, self.sep]], dtype=self.np.int64)
            feed = {"input_ids": ids, "attention_mask": self.np.ones_like(ids), "token_type_ids": self.np.zeros_like(ids)}
            probs = _softmax(self.session.run(None, {k: v for k, v in feed.items() if k in self.inputs})[0][0].tolist())
            out.append(sum(probs[i] for i in self.bad))
        return out


class _Transformers:
    """transformers + torch on CPU; used only when already installed."""

    def __init__(self, path: Path):
        import torch
        from transformers import AutoModelForSequenceClassification, AutoTokenizer
        self.torch, self.tok = torch, AutoTokenizer.from_pretrained(path)
        self.model = AutoModelForSequenceClassification.from_pretrained(path).eval()
        self.bad = malicious_indices(self.model.config.to_dict())

    def encode(self, text: str) -> list[int]:
        return self.tok(text, add_special_tokens=False)["input_ids"]

    def score(self, windows: list[list[int]]) -> list[float]:
        out = []
        with self.torch.no_grad():
            for window in windows:
                ids = self.torch.tensor([self.tok.build_inputs_with_special_tokens(window)])
                probs = self.model(input_ids=ids).logits[0].softmax(-1)
                out.append(float(sum(probs[i] for i in self.bad)))
        return out


def _load(path: str):
    """Backend for the model dir, or a reason string when none loads."""
    if not path or not Path(path).is_dir():
        return f"model directory missing: {path or '(unset)'}"
    errors = []
    for backend in (_Onnx, _Transformers):
        try:
            return backend(Path(path))
        except Exception as error:  # ImportError/MemoryError/bad files: fail open
            errors.append(f"{backend.__name__.strip('_').lower()}: {type(error).__name__}: {error}"[:160])
    return "; ".join(errors)


def backend(path: str):
    """Loaded backend or reason; one load per process and path, serialised so racing threads never load twice."""
    with _lock:
        if path not in _loaded:
            _loaded[path] = _load(path)
        return _loaded[path]


def score_text(model, text: str) -> tuple[float, int, bool]:
    """(max p(malicious) over windows, window count, truncated)."""
    windows, truncated = segments(model.encode(text))
    return max(model.score(windows)), len(windows), truncated


def shadow(fields: dict[str, str]) -> dict | None:
    """Shadow record {status, score, label, fields, …}; None when the flag is off. Never raises."""
    cfg = get_settings()
    if cfg.prompt_guard != "shadow":
        return None
    path = str(cfg.prompt_guard_path or "")
    model = backend(path)
    if isinstance(model, str):
        return {"status": "unavailable", "reason": model}
    started = time.perf_counter()
    scores, count, truncated = {}, 0, False
    try:
        for name, text in fields.items():
            if text and text.strip():
                value, windows, cut = score_text(model, text)
                scores[name], count, truncated = round(value, 4), count + windows, truncated or cut
    except Exception as error:
        return {"status": "error", "reason": f"{type(error).__name__}: {error}"[:200]}
    top = max(scores.values(), default=0.0)
    return {"status": "ok", "model": Path(path).name, "score": top, "label": "malicious" if top >= THRESHOLD else "benign",
            "threshold": THRESHOLD, "fields": scores, "segments": count, "truncated": truncated,
            "ms": round((time.perf_counter() - started) * 1000)}
