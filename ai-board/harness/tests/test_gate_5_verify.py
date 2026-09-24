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
            action = next(x for x in ("config", "up", "port", "exec", "cp", "down") if x in args)
            if action == "up":
                self.override = Path(args[args.index("-f") + 3]).read_text(encoding="utf-8")
            project = args[args.index("-p") + 1]
            config = {"services": {"tizia": {"environment": {"NODE_ENV": "production", "PORT": "8041",
                                                          "HOST": "0.0.0.0", "DATA_DIR": "/data", "BASE_PATH": ""},
                                               "image": f"{project}:latest",
                                               "cpus": 1.0, "mem_limit": 536870912, "pids_limit": 128,
                                               "ports": [{"target": 8041, "host_ip": "127.0.0.1"}],
                                               "volumes": [{"source": f"{project}-data", "target": "/data"}]}}}
            if action == "exec" and args[-1] == "env":
                stdout = self.container_env
            else:
                stdout = {"config": json.dumps(config), "up": "started", "port": "127.0.0.1:49152\n",
                          "exec": "generated tests passed", "cp": "copied", "down": "removed"}[action]
        else:
            action = "smoke"
            stdout = "user-state smoke PASS"
        generated_test = action == "exec" and "node" in args
        if self.fail == "generated_timeout" and generated_test:
            raise subprocess.TimeoutExpired(args, kwargs.get("timeout") or 60)
        code = 1 if self.fail == action or (self.fail == "generated_test" and generated_test) else 0
        return subprocess.CompletedProcess(args, code, stdout, "failed" if code else "")


def checkout(tmp_path):
    (tmp_path / "docker-compose.yml").write_text("services: {}\n", encoding="utf-8")
    (tmp_path / "Dockerfile").write_text("FROM scratch\n", encoding="utf-8")
    (tmp_path / "scripts").mkdir()
    (tmp_path / "scripts" / "smoke-user-state.sh").write_text("true\n", encoding="utf-8")
    (tmp_path / "public").mkdir()
    (tmp_path / "public" / "x.html").write_text("<h1>changed</h1>\n", encoding="utf-8")
    (tmp_path / "test").mkdir()
    (tmp_path / "test" / "generated.test.js").write_text("// generated\n", encoding="utf-8")
    return tmp_path


def state(path, *, visual=False):
    return {"skill_id": "skill-42", "full_checkout": str(path),
            "diffs": [{"file": "public/x.html" if visual else "public/x.js",
                       "test_file": "test/generated.test.js", "diff": "+x"}]}


def test_pass_uses_isolated_compose_smoke_and_down(tmp_path):
    runner = FakeRunner()
    s = state(checkout(tmp_path))

    out = verify.run(s, runner=runner)

    assert out["blocked"] is False
    assert out["evidence"]["smoke_passed"] is True
    assert out["evidence"]["http_observed"] is False
    assert "một luồng user-state" in out["evidence"]["text"]
    assert "pharmacysim-data:/data" not in runner.override
    assert "127.0.0.1::8041" in runner.override
    assert "name: ai-verify-skill-42-data" in runner.override
    assert "image: ai-verify-skill-42:latest" in runner.override
    assert "!override" in runner.override
    assert ["config", "up", "port", "exec", "exec", "cp", "exec", "down"] == [
        next(x for x in ("config", "up", "port", "exec", "cp", "down") if x in args)
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


def test_generated_test_failure_blocks_before_smoke(tmp_path):
    runner = FakeRunner(fail="generated_test")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert out["reason"] == "generated tests failed"
    assert out["failure_class"] == "ordinary"
    assert not any(args[0] != "docker" for args, _ in runner.calls)
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_generated_test_timeout_blocks_and_tears_down(tmp_path):
    runner = FakeRunner(fail="generated_timeout")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert out["reason"] == "generated tests timed out"
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_teardown_failure_is_environmental_not_repairable(tmp_path):
    out = verify.run(state(checkout(tmp_path)), runner=FakeRunner(fail="down"))
    assert out["blocked"] is True
    assert "teardown" in out["reason"]
    assert out["failure_class"] == "transient"


def test_up_failure_still_tears_down(tmp_path):
    runner = FakeRunner(fail="up")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert out["failure_class"] == "transient"
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
    assert out["failure_class"] == "critical"
    assert not any("up" in args for args, _ in runner.calls)
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_container_secret_blocks_without_leaking_value_to_evidence(tmp_path):
    runner = FakeRunner(container_env="NODE_ENV=production\nOLLAMA_SECKEY=do-not-log\n")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert "OLLAMA_SECKEY" in out["reason"]
    assert out["failure_class"] == "critical"
    assert "do-not-log" not in out["evidence"]["text"]
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_html_screenshot_artifact_is_mandatory_for_ui_changes(tmp_path, monkeypatch):
    s = state(checkout(tmp_path), visual=True)

    def capture(url, path):
        assert url == "http://127.0.0.1:49152/x.html"
        path.write_bytes(b"png")

    monkeypatch.setattr(verify, "capture_screenshot", capture)
    body = (tmp_path / "public" / "x.html").read_bytes()
    out = verify.run(s, runner=FakeRunner(), http_probe=lambda _url: (200, body))
    assert out["blocked"] is False
    assert out["evidence"]["http_observed"] is True
    assert Path(out["evidence"]["screenshot"]).read_bytes() == b"png"

    monkeypatch.setattr(verify, "capture_screenshot", lambda *_: (_ for _ in ()).throw(ImportError("playwright absent")))
    runner = FakeRunner()
    out = verify.run(s, runner=runner, http_probe=lambda _url: (200, body))
    assert out["blocked"] is True
    assert "screenshot" in out["reason"] and "playwright absent" in out["reason"]
    assert out["failure_class"] == "transient"  # missing browser is the environment, not the candidate
    assert out["evidence"]["screenshot"] is None
    assert runner.calls[-1][0][-2:] == ["down", "-v"]


def test_changed_html_must_return_success_over_http(tmp_path):
    out = verify.run(state(checkout(tmp_path), visual=True), runner=FakeRunner(),
                     http_probe=lambda _url: (404, b""))

    assert out["blocked"] is True
    assert "HTTP 404" in out["reason"]
    assert out["evidence"]["smoke_passed"] is False


def test_changed_html_response_must_match_the_checkout(tmp_path):
    out = verify.run(state(checkout(tmp_path), visual=True), runner=FakeRunner(),
                     http_probe=lambda _url: (200, b"old page"))

    assert out["blocked"] is True
    assert "does not match checkout" in out["reason"]
    assert out["evidence"]["http_observed"] is False


def test_non_html_change_has_no_canonical_http_page():
    assert verify._visual_pages([{"file": "public/x.js", "diff": "+const x = { style: 'red' };"}]) == []


def test_every_changed_html_page_must_match(tmp_path):
    root = checkout(tmp_path)
    (root / "public" / "y.html").write_text("<h1>second</h1>\n", encoding="utf-8")
    s = state(root, visual=True)
    s["diffs"].append({"file": "public/y.html", "test_file": "test/generated.test.js", "diff": "+y"})

    def probe(url):
        return (200, (root / "public" / "x.html").read_bytes()) if url.endswith("x.html") else (200, b"stale")

    out = verify.run(s, runner=FakeRunner(), http_probe=probe)
    assert out["blocked"] is True
    assert "y.html" in out["reason"]
    assert out["evidence"]["http_observed"] is False


def test_docker_binary_missing_is_transient(tmp_path):
    def runner(args, **_):
        raise FileNotFoundError("docker")
    out = verify.run(state(checkout(tmp_path)), runner=runner)
    assert out["blocked"] is True
    assert out["failure_class"] == "transient"


def test_pass_has_no_failure_class(tmp_path):
    assert verify.run(state(checkout(tmp_path)), runner=FakeRunner())["failure_class"] is None


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


def test_bash_is_git_bash_even_when_git_lives_in_mingw64(tmp_path, monkeypatch):
    git = tmp_path / "Git" / "mingw64" / "bin" / "git.exe"
    bash = tmp_path / "Git" / "bin" / "bash.exe"
    for path in (git, bash):
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("", encoding="utf-8")
    monkeypatch.setattr(verify.os, "name", "nt")
    monkeypatch.setattr(verify.shutil, "which", lambda name: str(git) if name == "git" else None)
    assert verify._bash() == str(bash)


def test_smoke_script_path_is_posix_for_git_bash(tmp_path):
    runner = FakeRunner()
    verify.run(state(checkout(tmp_path)), runner=runner)
    smoke_args = next(args for args, _ in runner.calls if args[0] != "docker")
    assert "\\" not in smoke_args[-1]


def test_changed_lines_must_be_served_even_when_the_server_injects_tags(tmp_path, monkeypatch):
    monkeypatch.setattr(verify, "capture_screenshot", lambda _url, path: path.write_bytes(b"png"))
    """Tizia injects analytics/SEO tags into every HTML page, so bytes never match the file."""
    root = checkout(tmp_path)
    (root / "public" / "x.html").write_text("<head></head><body>\n<h1>old</h1>\n<p>new line</p>\n</body>\n",
                                            encoding="utf-8")
    s = state(root, visual=True)
    s["full_diff"] = [{"file": "", "diff": (
        "diff --git a/public/x.html b/public/x.html\n--- a/public/x.html\n+++ b/public/x.html\n"
        "@@ -1,3 +1,4 @@\n <h1>old</h1>\n+<p>new line</p>\n"
        "diff --git a/test/generated.test.js b/test/generated.test.js\n+// generated\n")}]
    served = b"<head><meta name=x></head><body>\n<h1>old</h1>\n<p>new line</p>\n<script src=a.js></script>\n</body>\n"
    out = verify.run(s, runner=FakeRunner(), http_probe=lambda _url: (200, served))
    assert out["blocked"] is False
    assert out["evidence"]["http_observed"] is True

    out = verify.run(s, runner=FakeRunner(), http_probe=lambda _url: (200, b"<body>\n<h1>old</h1>\n</body>"))
    assert out["blocked"] is True
    assert "does not match checkout" in out["reason"]


def test_evidence_names_the_runner_so_a_fake_run_is_never_presented_as_real(tmp_path, monkeypatch):
    assert verify.run(state(checkout(tmp_path)), runner=FakeRunner())["evidence"]["runner"] == "fake"
    monkeypatch.setattr(verify.subprocess, "run", FakeRunner())
    (tmp_path / "real").mkdir()
    assert verify.run(state(checkout(tmp_path / "real")))["evidence"]["runner"] == "docker"
