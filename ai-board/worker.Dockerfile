# syntax=docker/dockerfile:1.7
# AI Board worker: Python harness + git + Node 20 (gate 4 `node --check`) + Chromium (gate 5 screenshot)
# + its own Docker daemon (gate 5 builds the candidate in Docker-in-Docker, never the host socket).
# Build from the repo root: docker compose -f docker-compose.yml -f docker-compose.ai-board.yml build

FROM docker:27-dind AS docker
FROM node:20-bookworm-slim AS node

FROM python:3.12-slim-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends \
      bash ca-certificates curl git iptables tini \
    && rm -rf /var/lib/apt/lists/*
# Static docker/dockerd/containerd/runc + compose and buildx plugins (compose v2: `!override` tags in gate 5).
COPY --from=docker /usr/local/bin/ /usr/local/bin/
COPY --from=docker /usr/local/libexec/docker/ /usr/local/libexec/docker/
COPY --from=node /usr/local/bin/node /usr/local/bin/node

ENV VIRTUAL_ENV=/opt/venv PATH=/opt/venv/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
    PYTHONUNBUFFERED=1 PYTHONIOENCODING=utf-8
COPY ai-board/harness/requirements.txt /tmp/requirements.txt
RUN python -m venv /opt/venv && pip install --no-cache-dir -r /tmp/requirements.txt \
    && python -m playwright install --with-deps chromium && rm -rf /var/lib/apt/lists/*

# Harness code is baked in (redeploy to update it); the repo it changes is a separate clone (/repo).
RUN groupadd -r docker && useradd -m -u 10001 -G docker aiboard
WORKDIR /opt/ai-board
COPY ai-board/ ai-board/
COPY server/ server/
COPY scripts/ scripts/
RUN mkdir -p ai-board/memory /repo && chown -R aiboard:aiboard ai-board/memory /repo

ENTRYPOINT ["tini", "--", "/bin/sh", "/opt/ai-board/ai-board/worker-entrypoint.sh"]
