# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d
# ca-certificates: Microsandbox pulls OCI images over TLS and panics without a system CA bundle
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends ca-certificates
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY src ./src
# default policy baked in so Git-deployed stacks need no bind mount; compose may still mount another policy over it
COPY sandbox-policy.large.yaml /etc/sandbox/sandbox-policy.yaml
COPY sandbox-policy.large.yaml /etc/sandbox/sandbox-policy.large.yaml
COPY sandbox-policy.dev.yaml /etc/sandbox/sandbox-policy.dev.yaml
COPY sandbox-policy.online.yaml /etc/sandbox/sandbox-policy.online.yaml
# volume mounted here inherits node ownership, so the non-root runner can keep images/state
RUN mkdir -p /home/node/.microsandbox && chown node:node /home/node/.microsandbox
USER node
CMD ["node", "src/server.js"]
