# syntax=docker/dockerfile:1.7
# AI Board worker: Python harness + git + Node 20 (gate 4 `node --check`) + Chromium (gate 5 screenshot)
# + its own Docker daemon (gate 5 builds the candidate in Docker-in-Docker, never the host socket).
# Build from the repo root: docker compose -f docker-compose.dev.ai.yml --profile ai-board build ai-board-worker

FROM docker:27-dind@sha256:aa3df78ecf320f5fafdce71c659f1629e96e9de0968305fe1de670e0ca9176ce AS docker
FROM node:20-bookworm-slim@sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0 AS node

FROM python:3.12-slim-bookworm@sha256:6a0e06f5ba0b373d051aabd3fffb9b873f27f9a2a3a14bcbe37dee6f0e3bbc70
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
      bash ca-certificates curl git iptables tini
# Static docker/dockerd/containerd/runc + compose and buildx plugins (compose v2: `!override` tags in gate 5).
COPY --from=docker /usr/local/bin/ /usr/local/bin/
COPY --from=docker /usr/local/libexec/docker/ /usr/local/libexec/docker/
COPY --from=node /usr/local/bin/node /usr/local/bin/node

ENV VIRTUAL_ENV=/opt/venv PATH=/opt/venv/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
    PYTHONUNBUFFERED=1 PYTHONIOENCODING=utf-8
# WORKER_CHROMIUM=0 bỏ Chromium (~1.2 GB). Chỉ an toàn khi AI_BOARD_SANDBOX_URL được đặt: gate 5 khi đó chạy trong guest có Chromium riêng.
ARG WORKER_CHROMIUM=1
COPY ai-board/harness/requirements.txt /tmp/requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    python -m venv /opt/venv && pip install -r /tmp/requirements.txt \
    && if [ "$WORKER_CHROMIUM" = 1 ]; then python -m playwright install --with-deps chromium; fi

# Harness code is baked in (redeploy to update it); the repo it changes is a separate clone (/repo).
RUN groupadd -r docker && useradd -m -u 10001 -G docker aiboard
WORKDIR /opt/ai-board
COPY ai-board/ ai-board/
COPY server/ server/
COPY package.json ./package.json
COPY scripts/ scripts/
RUN node scripts/check-skills.mjs
RUN mkdir -p ai-board/memory /repo && chown -R aiboard:aiboard ai-board/memory /repo

ENTRYPOINT ["tini", "--", "/bin/sh", "/opt/ai-board/ai-board/worker-entrypoint.sh"]
