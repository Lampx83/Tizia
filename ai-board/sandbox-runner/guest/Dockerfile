# syntax=docker/dockerfile:1.7
# Gate 5 guest rootfs for the Microsandbox microVM: the worker's verification toolchain without the worker.
# Same toolchain as ai-board/worker.Dockerfile (python + docker/dockerd/compose + node 20 + playwright chromium),
# harness baked in so the candidate can never replace the gate's own scripts. Build from the repo root:
#   docker build -f ai-board/sandbox-runner/guest/Dockerfile -t tizia-gate5-guest:dev .
FROM docker:27-dind@sha256:aa3df78ecf320f5fafdce71c659f1629e96e9de0968305fe1de670e0ca9176ce AS docker
FROM node:20-bookworm-slim@sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0 AS node

FROM python:3.12-slim-bookworm@sha256:6a0e06f5ba0b373d051aabd3fffb9b873f27f9a2a3a14bcbe37dee6f0e3bbc70
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
      bash ca-certificates curl git iptables tini procps fonts-inter
COPY --from=docker /usr/local/bin/ /usr/local/bin/
COPY --from=docker /usr/local/libexec/docker/ /usr/local/libexec/docker/
COPY --from=node /usr/local/bin/node /usr/local/bin/node

ENV VIRTUAL_ENV=/opt/venv PATH=/opt/venv/bin:/usr/local/bin:/usr/local/sbin:/usr/sbin:/usr/bin:/sbin:/bin \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright PYTHONUNBUFFERED=1 PYTHONIOENCODING=utf-8
COPY ai-board/harness/requirements.txt /tmp/requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    python -m venv /opt/venv && pip install -r /tmp/requirements.txt \
    && python -m playwright install --with-deps chromium

# Chromium refuses to run as root, and the gate must not run candidate-adjacent code as root anyway
RUN groupadd -r docker && useradd -m -u 10001 -G docker gate
WORKDIR /opt/ai-board
COPY ai-board/harness ai-board/harness
COPY server/ai-board server/ai-board
COPY scripts/smoke-user-state.sh scripts/smoke-user-state.sh
COPY ai-board/sandbox-runner/guest/guest-boot.sh /usr/local/bin/guest-boot.sh
COPY ai-board/sandbox-runner/guest/isolate-evaluator.sh /usr/local/bin/isolate-evaluator.sh
RUN sh /usr/local/bin/isolate-evaluator.sh
RUN chmod +x /usr/local/bin/guest-boot.sh && mkdir -p /workspace
