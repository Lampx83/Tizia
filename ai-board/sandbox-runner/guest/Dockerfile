# syntax=docker/dockerfile:1.7
# Gate 5 guest rootfs for the Microsandbox microVM: the worker's verification toolchain without the worker.
# Same toolchain as ai-board/worker.Dockerfile (python + docker/dockerd/compose + node 20 + playwright chromium),
# harness baked in so the candidate can never replace the gate's own scripts. Build from the repo root:
#   docker build -f ai-board/sandbox-runner/guest/Dockerfile -t tizia-gate5-guest:dev .
FROM docker:27-dind AS docker
FROM node:20-bookworm-slim AS node

FROM python:3.12-slim-bookworm
RUN apt-get update && apt-get install -y --no-install-recommends \
      bash ca-certificates curl git iptables tini procps \
    && apt-get clean && find /var/lib/apt/lists -type f -delete
COPY --from=docker /usr/local/bin/ /usr/local/bin/
COPY --from=docker /usr/local/libexec/docker/ /usr/local/libexec/docker/
COPY --from=node /usr/local/bin/node /usr/local/bin/node

ENV VIRTUAL_ENV=/opt/venv PATH=/opt/venv/bin:/usr/local/bin:/usr/local/sbin:/usr/sbin:/usr/bin:/sbin:/bin \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright PYTHONUNBUFFERED=1 PYTHONIOENCODING=utf-8
COPY ai-board/harness/requirements.txt /tmp/requirements.txt
RUN python -m venv /opt/venv && pip install --no-cache-dir -r /tmp/requirements.txt \
    && python -m playwright install --with-deps chromium && find /var/lib/apt/lists -type f -delete

# Chromium refuses to run as root, and the gate must not run candidate-adjacent code as root anyway
RUN groupadd -r docker && useradd -m -u 10001 -G docker gate
WORKDIR /opt/ai-board
COPY ai-board/harness ai-board/harness
COPY server/ai-board server/ai-board
COPY scripts/smoke-user-state.sh scripts/smoke-user-state.sh
COPY ai-board/sandbox-runner/guest/guest-boot.sh /usr/local/bin/guest-boot.sh
RUN chmod +x /usr/local/bin/guest-boot.sh && mkdir -p /workspace
