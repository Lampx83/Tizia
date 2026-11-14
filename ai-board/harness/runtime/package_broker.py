"""Package broker: networked npm resolve outside the sandbox. Lockfile-only install, install-script reject, layer keyed by lockfile hash."""
from __future__ import annotations

import difflib
import hashlib
import json
import subprocess
import tempfile
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

MANIFEST, LOCKFILE = "package.json", "package-lock.json"
FILES = (MANIFEST, LOCKFILE)
INSTALL_SCRIPTS = ("preinstall", "install", "postinstall")
DEFAULT_LAYER_CAP = 5
APPROVED, REJECTED, ERROR = "approved", "rejected", "error"
DEPS_DOCKERFILE = ("FROM node:20-alpine AS tizia-deps\nWORKDIR /app\nCOPY package*.json ./\n"
                   "RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund\n")


class BrokerError(Exception):
    """Registry, npm or docker step failed; message is the observation text."""


def script_reason(name: str, version: str) -> str:
    return f"{name}@{version} runs install scripts; packages needing preinstall/install/postinstall are rejected"


def lock_key(lock_text: str) -> str:
    return hashlib.sha256(lock_text.encode("utf-8")).hexdigest()


def unified(path: str, old: str, new: str) -> str:
    body = "".join(difflib.unified_diff(old.splitlines(True), new.splitlines(True), f"a/{path}", f"b/{path}"))
    return f"diff --git a/{path} b/{path}\n{body}" if body else ""


def check_scope(old: dict[str, str], new: dict[str, str], name: str, version: str) -> list[str]:
    """New lock keys (name + transitive); raise unless only dependencies[name] changed and no existing lock entry moved."""
    old_pkg, new_pkg = json.loads(old[MANIFEST]), json.loads(new[MANIFEST])
    rest = lambda pkg: {k: v for k, v in pkg.items() if k != "dependencies"}
    old_deps, new_deps = old_pkg.get("dependencies") or {}, new_pkg.get("dependencies") or {}
    moved = {k for k in {*old_deps, *new_deps} if old_deps.get(k) != new_deps.get(k)}
    if rest(old_pkg) != rest(new_pkg) or moved != {name}:
        raise BrokerError(f"unexpected {MANIFEST} change beyond {name}")
    old_entries = json.loads(old[LOCKFILE]).get("packages") or {}
    new_entries = json.loads(new[LOCKFILE]).get("packages") or {}
    changed = [key for key, entry in old_entries.items() if key and new_entries.get(key) != entry]
    if changed:
        raise BrokerError(f"existing lock entries changed: {', '.join(sorted(changed)[:5])}")
    if (new_entries.get(f"node_modules/{name}") or {}).get("version") != version:
        raise BrokerError(f"{name}@{version} not locked at the approved version")
    return sorted(key for key in new_entries if key and key not in old_entries)


class LayerCache:
    """Dependency layers by lockfile hash; LRU eviction past `cap`. Index at <dir>/index.json."""

    def __init__(self, directory: Path, layers, cap: int = DEFAULT_LAYER_CAP, clock=time.time):
        self.dir, self.layers, self.cap, self.clock = Path(directory), layers, max(1, int(cap)), clock
        self.dir.mkdir(parents=True, exist_ok=True)
        self.index_file = self.dir / "index.json"

    def _index(self) -> dict:
        return json.loads(self.index_file.read_text(encoding="utf-8")) if self.index_file.is_file() else {}

    def ensure(self, key: str, context: Path) -> tuple[str, bool]:
        """(ref, reused): reuse a cached layer, else build + load into the guest cache; evict least recently used past cap."""
        index = self._index()
        reused = key in index
        if not reused:
            index[key] = {"ref": self.layers.build(context, key)}
            self.layers.load(index[key]["ref"])
        index[key]["last_used"] = self.clock()
        while len(index) > self.cap:
            oldest = min((k for k in index if k != key), key=lambda k: index[k]["last_used"])
            self.layers.remove(index.pop(oldest)["ref"])
        self.index_file.write_text(json.dumps(index, sort_keys=True), encoding="utf-8")
        return index[key]["ref"], reused

    def keys(self) -> list[str]:
        return sorted(self._index())


class Broker:
    """resolve(request) -> {decision, diff?, layer_key?, metadata, reason}. Runs outside the sandbox, never inside the guest."""

    def __init__(self, checkout, registry, npm, cache: LayerCache, *, receipts_file: Path | None = None, clock=time.time):
        self.checkout, self.registry, self.npm, self.cache, self.clock = Path(checkout), registry, npm, cache, clock
        self.receipts_file = Path(receipts_file) if receipts_file else cache.dir / "receipts.jsonl"
        self.receipts: list[dict] = []

    def _receipt(self, action: str, request: dict, result: dict, **extra) -> dict:
        row = {"action": action, "call_id": request.get("call_id"), "name": request.get("name"),
               "version": (result.get("metadata") or {}).get("version"), "decision": result["decision"],
               "reason": result.get("reason"), "layer_key": result.get("layer_key"), "at": self.clock(), **extra}
        self.receipts.append(row)
        with self.receipts_file.open("a", encoding="utf-8") as out:
            out.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")
        return result

    def screen(self, request: dict) -> dict:
        """Registry metadata for the admin card; install-script packages come back rejected. No install, no diff."""
        try:
            metadata = dict(self.registry.metadata(request["name"], request.get("version_range") or "latest"))
        except (BrokerError, OSError, ValueError) as error:
            return self._receipt("screen", request, {"decision": ERROR, "metadata": {}, "reason": f"registry lookup failed: {error}"})
        scripts = [s for s in INSTALL_SCRIPTS if (metadata.get("scripts") or {}).get(s)]
        metadata["install_scripts"] = scripts
        if scripts:
            return self._receipt("screen", request, {"decision": REJECTED, "metadata": metadata,
                                                     "reason": script_reason(request["name"], metadata["version"])})
        return self._receipt("screen", request, {"decision": APPROVED, "metadata": metadata, "reason": "screened"})

    def resolve(self, request: dict) -> dict:
        if request.get("kind") != "package":
            return {"decision": ERROR, "metadata": {}, "reason": "broker handles package requests only"}
        screened = self.screen(request)
        if screened["decision"] != APPROVED:
            return screened
        metadata, name = screened["metadata"], request["name"]
        version = metadata["version"]
        try:
            old = {file: (self.checkout / file).read_text(encoding="utf-8") for file in FILES}
        except OSError:
            return self._receipt("resolve", request, {"decision": ERROR, "metadata": metadata,
                                                      "reason": f"checkout lacks {MANIFEST} or {LOCKFILE}"})
        with tempfile.TemporaryDirectory(prefix="pkg-broker-") as tmp:
            work = Path(tmp)
            for file, text in old.items():
                (work / file).write_text(text, encoding="utf-8")
            try:
                self.npm.lock_only(work, f"{name}@{version}")
                new = {file: (work / file).read_text(encoding="utf-8") for file in FILES}
                added = check_scope(old, new, name, version)
                lock = json.loads(new[LOCKFILE])["packages"]
                scripted = [key for key in added if lock[key].get("hasInstallScript")]
                if scripted:
                    return self._receipt("resolve", request, {"decision": REJECTED, "metadata": {**metadata, "install_scripts": scripted},
                                                              "reason": f"install scripts in: {', '.join(scripted[:5])}"})
                metadata = {**metadata, "transitive_count": len(added) - 1}
                key = lock_key(new[LOCKFILE])
                (work / "Dockerfile").write_text(DEPS_DOCKERFILE, encoding="utf-8")
                ref, reused = self.cache.ensure(key, work)
            except (BrokerError, OSError, ValueError, subprocess.SubprocessError) as error:
                return self._receipt("resolve", request, {"decision": ERROR, "metadata": metadata, "reason": str(error)[:500]})
        diff = "".join(unified(file, old[file], new[file]) for file in FILES)
        return self._receipt("resolve", request, {"decision": APPROVED, "diff": diff, "layer_key": key, "metadata": metadata,
                                                  "reason": f"approved {name}@{version}"}, reused=reused, layer_ref=ref)


def attach(checkout, approved: list[dict]) -> None:
    """Apply broker diffs to the candidate checkout; refuse any path outside package.json / package-lock.json."""
    for item in approved:
        paths = {line.split(" b/", 1)[1] for line in item["diff"].splitlines() if line.startswith("diff --git ")}
        if not paths or paths - set(FILES):
            raise BrokerError(f"broker diff touches {sorted(paths - set(FILES)) or 'nothing'}")
        subprocess.run(["git", "apply", "--whitespace=nowarn", "-"], cwd=checkout, input=item["diff"].encode(), check=True,
                       capture_output=True)


class NpmCli:
    """Real lockfile-only install; manual-smoke path."""

    def lock_only(self, workdir: Path, spec: str) -> None:
        done = subprocess.run(["npm", "install", spec, "--package-lock-only", "--ignore-scripts", "--no-audit", "--no-fund"],
                              cwd=workdir, capture_output=True, text=True, timeout=300)
        if done.returncode:
            raise BrokerError(f"npm install failed: {done.stderr.strip()[-300:]}")


def _npm_view(spec: str, *fields: str):
    done = subprocess.run(["npm", "view", spec, *fields, "--json"], capture_output=True, text=True, timeout=60)
    if done.returncode:
        raise BrokerError(f"npm view failed: {done.stderr.strip()[-200:]}")
    return json.loads(done.stdout)


class NpmRegistry:
    """Real registry metadata via `npm view` + the downloads API; manual-smoke path."""

    def metadata(self, name: str, version_range: str) -> dict:
        found = _npm_view(f"{name}@{version_range}", "version", "license", "scripts")
        found = found[-1] if isinstance(found, list) else found
        version = found["version"]
        published = (_npm_view(name, "time") or {}).get(version)
        age = (datetime.now(timezone.utc) - datetime.fromisoformat(published.replace("Z", "+00:00"))).days if published else None
        with urllib.request.urlopen(f"https://api.npmjs.org/downloads/point/last-week/{name}", timeout=15) as response:
            weekly = json.load(response).get("downloads")
        return {"version": version, "license": found.get("license"), "scripts": found.get("scripts") or {},
                "age_days": age, "weekly_downloads": weekly}


class DockerLayers:
    """Real `tizia-deps` stage build, exported as a tar into the guest layer-cache dir; manual-smoke path."""

    def __init__(self, export_dir: Path):
        self.export_dir = Path(export_dir)

    def _tar(self, ref: str) -> Path:
        return self.export_dir / (ref.split(":")[1] + ".tar")

    def build(self, context: Path, key: str) -> str:
        ref = f"tizia-deps:{key[:12]}"
        subprocess.run(["docker", "build", "--target", "tizia-deps", "-t", ref, str(context)], check=True, capture_output=True, timeout=900)
        return ref

    def load(self, ref: str) -> None:
        self.export_dir.mkdir(parents=True, exist_ok=True)
        subprocess.run(["docker", "save", "-o", str(self._tar(ref)), ref], check=True, capture_output=True, timeout=600)

    def remove(self, ref: str) -> None:
        self._tar(ref).unlink(missing_ok=True)
        subprocess.run(["docker", "rmi", ref], capture_output=True, timeout=120)


def configured(checkout, directory, cap: int = DEFAULT_LAYER_CAP):
    """Real broker rooted at `directory`; None when unset."""
    if not directory:
        return None
    root = Path(directory)
    return Broker(checkout, NpmRegistry(), NpmCli(), LayerCache(root / "cache", DockerLayers(root / "guest-layers"), cap))
