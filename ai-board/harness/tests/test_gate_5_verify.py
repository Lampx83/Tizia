"""Gate 5's Docker and smoke commands are fake at the subprocess boundary."""
from dataclasses import replace
from pathlib import Path
import json
import subprocess

import main
from gates import verify


class FakeRunner:
    def __init__(self, *, fail=None, container_env="NODE_ENV=production\nPORT=8041\n"):
        self.fail = fail
        self.container_env = container_env
        self.calls = []
        self.override = None

    def __call__(self, args, **kwargs):
        self.calls.append((args, kwargs))
        if args[0] == "docker":
            action = next(x for x in ("config", "up", "port", "exec", "down") if x in args)
            if action == "up":
                self.override = Path(args[args.index("-f") + 3]).read_text(encoding="utf-8")
            project = args[args.index("-p") + 1]
            config = {"services": {"tizia": {"environment": {"NODE_ENV": "production", "PORT": "8041",
                                                          "HOST": "0.0.0.0", "DATA_DIR": "/data", "BASE_PATH": ""},
                                               "image": f"{project}:latest",
                                               "ports": [{"target": 8041, "host_ip": "127.0.0.1"}],
                                               "volumes": [{"source": f"{project}-data", "target": "/data"}]}}}
            stdout = {"config": json.dumps(config), "up": "started", "port": "127.0.0.1:49152\n",
                      "exec": self.container_env, "down": "removed"}[action]
        else:
            action = "smoke"
            stdout = "user-state smoke PASS"
        code = 1 if self.fail == action else 0
        return subprocess.CompletedProcess(args, code, stdout, "failed" if code else "")


def checkout(tmp_path):
    (tmp_path / "docker-compose.yml").write_text("services: {}\n", encoding="utf-8")
    (tmp_path / "Dockerfile").write_text("FROM scratch\n", encoding="utf-8")
    (tmp_path / "scripts").mkdir()
    (tmp_path / "scripts" / "smoke-user-state.sh").write_text("true\n", encoding="utf-8")
    return tmp_path


def state(path, *, visual=False):
    return {"skill_id": "skill-42", "full_checkout": str(path),
            "diffs": [{"file": "public/x.html" if visual else "public/x.js", "diff": "+<style>x</style>" if visual else "+x"}]}


def test_pass_uses_isolated_compose_smoke_and_down(tmp_path):
    runner = FakeRunner()
    s = state(checkout(tmp_path))

    out = verify.run(s, runner=runner)

    assert out["blocked"] is False
    assert out["evidence"]["smoke_passed"] is True
    assert "một luồng user-state" in out["evidence"]["text"]
    assert "pharmacysim-data:/data" not in runner.override
    assert "127.0.0.1::8041" in runner.override
    assert "name: ai-verify-skill-42-data" in runner.override
    assert "image: ai-verify-skill-42:latest" in runner.override
    assert "!override" in runner.override
    assert ["config", "up", "port", "exec", "down"] == [
        next(x for x in ("config", "up", "port", "exec", "down") if x in args)
        for args, _ in runner.calls if args[0] == "docker"]
    assert runner.calls[-1][0][-2:] == ["down", "-v"]
    smoke_args, smoke_kw = next((args, kw) for args, kw in runner.calls if args[0] != "docker")
    assert Path(smoke_args[-1]) == verify.SMOKE_SCRIPT
    assert smoke_kw["env"]["BASE"] == "http://127.0.0.1:49152"


def test_smoke_failure_still_tears_down(tmp_path):
    runner = FakeRunner(fail="smoke")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert out["evidence"]["smoke_passed"] is False
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_up_failure_still_tears_down(tmp_path):
    runner = FakeRunner(fail="up")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_unsafe_compose_config_blocks_before_up(tmp_path):
    class UnsafeRunner(FakeRunner):
        def __call__(self, args, **kwargs):
            result = super().__call__(args, **kwargs)
            if "config" in args:
                config = json.loads(result.stdout)
                config["services"]["tizia"]["ports"][0]["published"] = "8041"
                result.stdout = json.dumps(config)
            return result

    runner = UnsafeRunner()
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert "không cách ly" in out["reason"]
    assert not any("up" in args for args, _ in runner.calls)
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_container_secret_blocks_without_leaking_value_to_evidence(tmp_path):
    runner = FakeRunner(container_env="NODE_ENV=production\nOLLAMA_SECKEY=do-not-log\n")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert "OLLAMA_SECKEY" in out["reason"]
    assert "do-not-log" not in out["evidence"]["text"]
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_html_screenshot_artifact_and_missing_playwright_is_best_effort(tmp_path, monkeypatch):
    s = state(checkout(tmp_path), visual=True)

    def capture(url, path):
        assert url == "http://127.0.0.1:49152/x.html"
        path.write_bytes(b"png")

    monkeypatch.setattr(verify, "capture_screenshot", capture)
    out = verify.run(s, runner=FakeRunner())
    assert out["blocked"] is False
    assert Path(out["evidence"]["screenshot"]).read_bytes() == b"png"

    monkeypatch.setattr(verify, "capture_screenshot", lambda *_: (_ for _ in ()).throw(ImportError("playwright absent")))
    out = verify.run(s, runner=FakeRunner())
    assert out["blocked"] is False
    assert out["evidence"]["screenshot"] is None
    assert "playwright absent" in out["evidence"]["text"]


def test_added_style_value_requests_one_best_effort_capture():
    assert verify._visual_page([{"file": "public/x.js", "diff": "+const x = { style: 'red' };"}]) == "/"


def test_missing_full_checkout_blocks_clearly(fake_deps):
    deps = replace(fake_deps, verify=None)
    out = main.run_gate(5, {}, deps, None, {"skill_id": "x"})
    assert out["blocked"] is True
    assert "full_checkout" in out["reason"]


def test_main_prepares_checkout_at_gate_5_then_calls_verify(monkeypatch, fake_deps, tmp_path):
    deps = replace(fake_deps, verify=None)
    s = {"checkout_source": str(tmp_path), "skill_id": "x"}
    calls = []

    def prepare(state, source):
        calls.append(("prepare", source))
        state["full_checkout"] = str(tmp_path)

    def run(state, *_):
        calls.append(("verify", state["full_checkout"]))
        return {"gate": 5, "blocked": False, "reason": None}

    monkeypatch.setattr(main, "prepare_full_checkout", prepare)
    monkeypatch.setattr(main.verify, "run", run)
    assert main.run_gate(5, {}, deps, None, s)["blocked"] is False
    assert calls == [("prepare", str(tmp_path)), ("verify", str(tmp_path))]


def test_main_prepares_checkout_only_at_gate_5(tmp_path, monkeypatch, fake_deps):
    scratch = tmp_path / "scratch"
    (scratch / "public").mkdir(parents=True)
    (scratch / "public" / "x.html").write_text("new", encoding="utf-8")
    (scratch / "test").mkdir()
    (scratch / "test" / "x.test.js").write_text("test", encoding="utf-8")
    target = tmp_path / "checkout"
    target.mkdir()
    monkeypatch.setattr(main.tempfile, "mkdtemp", lambda **_: str(target))
    commands = []

    def fake_git(args, **kw):
        commands.append(args)
        return subprocess.CompletedProcess(args, 0, "diff --git a/public/x.html b/public/x.html\n", "")

    monkeypatch.setattr(main.subprocess, "run", fake_git)
    s = {"scratch_repo": str(scratch), "checkout_source": tmp_path / "source",
         "diffs": [{"file": "public/x.html", "test_file": "test/x.test.js"}], "skill_id": "x"}
    main.prepare_full_checkout(s, s["checkout_source"])
    assert (target / "public" / "x.html").read_text(encoding="utf-8") == "new"
    assert s["full_checkout"] == str(target)
    assert s["full_diff"][0]["diff"].startswith("diff --git")
    assert commands[0][:3] == ["git", "clone", "--local"]
