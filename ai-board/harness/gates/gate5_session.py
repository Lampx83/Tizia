"""Gate 5 session: failure class per stage, owned Compose project (commands, teardown)."""
from __future__ import annotations

import re
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
    "tooling": "transient",     # acceptance tool absent from the image: fix the image, not the candidate
}

_SHELL_NOT_FOUND = re.compile(r"\b(?:ba|da)?sh: (?:line \d+: |\d+: )?([\w.+-]+): (?:command )?not found")
_NO_CMD = re.compile(r"\b([\w.+-]+): command not found")


def missing_tool(output: str, returncode: int | None = None, command: str = "") -> str | None:
    """Tool name the shell could not find (`not found` text, else exit 127 + first word); None otherwise."""
    hit = _SHELL_NOT_FOUND.search(output or "") or _NO_CMD.search(output or "")
    if hit:
        return hit.group(1)
    if returncode == 127:
        words = [w for w in command.split() if "=" not in w]
        return words[0] if words else "?"
    return None


def failure_class(stage: str, reason: str | None) -> str | None:
    """Class of the failed stage; None when run passed. Unknown stage raises KeyError."""
    cls = STAGE_CLASS[stage]
    return cls if reason else None


class CommandFailed(RuntimeError):
    """Nonzero Compose command exit; keeps redacted output for missing_tool()."""

    def __init__(self, message: str, returncode: int, output: str):
        super().__init__(message)
        self.returncode, self.output = returncode, output


class Compose:
    """One owned Compose project: runs commands, redacts logs, tears down."""

    def __init__(self, runner, checkout: Path, project: str, password: str, compose: list[str], logs: list[str]):
        self.runner, self.checkout, self.project = runner, checkout, project
        self.password, self.compose, self.logs = password, compose, logs

    def command(self, args: list[str], *, env=None, log_output=True, timeout=None) -> subprocess.CompletedProcess:
        result = self.runner(args, cwd=self.checkout, env=env, text=True, encoding="utf-8", errors="replace", capture_output=True,
                             stdin=subprocess.DEVNULL, check=False, timeout=timeout)
        text = redact(f"{result.stdout or ''}{result.stderr or ''}".replace(self.password, "[synthetic credential]"))
        output = "[output redacted]"
        if log_output:
            output = (text.strip()[-4000:] or "(không có chi tiết lỗi)") if result.returncode else f"exit {result.returncode}"
        self.logs.append(f"$ {' '.join(str(a) for a in args)}\n{output}")
        if result.returncode:
            raise CommandFailed(f"{' '.join(str(a) for a in args[:4])} exit {result.returncode}", result.returncode, text)
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
