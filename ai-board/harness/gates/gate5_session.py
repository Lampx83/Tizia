"""Gate 5 session: failure class per stage, owned Compose project (commands, teardown)."""
from __future__ import annotations

import subprocess
from pathlib import Path

from meter import redact

STAGE_CLASS = {
    "preflight": "transient",   # missing checkout/skill/Dockerfile: environment
    "boot": "transient",        # compose config/up/exec before containers are trusted
    "config": "critical",       # compose config outside this run's isolation
    "address": "critical",      # container address/port not safe to probe
    "env": "critical",          # container env leaks secrets or wrong DSN
    "ordinary": "ordinary",     # candidate's own tests, acceptance, smoke, pages
    "plan": "plan",             # wrong landing page, unobservable change: plan must fix
    "screenshot": "transient",  # browser missing
    "teardown": "transient",    # leaked containers are the environment's problem
}


def failure_class(stage: str, reason: str | None) -> str | None:
    """Class of the failed stage; None when run passed. Unknown stage raises KeyError."""
    cls = STAGE_CLASS[stage]
    return cls if reason else None


class Compose:
    """One owned Compose project: runs commands, redacts logs, tears down."""

    def __init__(self, runner, checkout: Path, project: str, password: str, compose: list[str], logs: list[str]):
        self.runner, self.checkout, self.project = runner, checkout, project
        self.password, self.compose, self.logs = password, compose, logs

    def command(self, args: list[str], *, env=None, log_output=True, timeout=None) -> subprocess.CompletedProcess:
        result = self.runner(args, cwd=self.checkout, env=env, text=True, encoding="utf-8", errors="replace", capture_output=True,
                             stdin=subprocess.DEVNULL, check=False, timeout=timeout)
        output = "[output redacted]"
        if log_output:
            output = f"{result.stdout or ''}{result.stderr or ''}"
            output = (redact(output.replace(self.password, "[synthetic credential]")).strip()[-4000:] or "(không có chi tiết lỗi)") if result.returncode else f"exit {result.returncode}"
        self.logs.append(f"$ {' '.join(str(a) for a in args)}\n{output}")
        if result.returncode:
            raise RuntimeError(f"{' '.join(str(a) for a in args[:4])} exit {result.returncode}")
        return result

    def down(self) -> None:
        """`compose down -v`, then raise if any project container, volume or network survives."""
        self.command([*self.compose, "down", "-v"])
        remaining = [self.command(["docker", resource, "ls", "--all", "--filter", f"{key}={value}", "--format", "{{.ID}}"], log_output=False).stdout.strip()
                     for resource, key, value in (("container", "label", f"com.docker.compose.project={self.project}"),)]
        remaining += [self.command(["docker", resource, "ls", "--filter", "name=" + self.project, "--format", "{{.Name}}"], log_output=False).stdout.strip()
                      for resource in ("volume", "network")]
        if any(remaining):
            raise RuntimeError("run resources remain after Compose down")
