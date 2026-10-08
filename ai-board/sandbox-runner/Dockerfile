FROM node:22-bookworm-slim
# ca-certificates: Microsandbox pulls OCI images over TLS and panics without a system CA bundle
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
# volume mounted here inherits node ownership, so the non-root runner can keep images/state
RUN mkdir -p /home/node/.microsandbox && chown node:node /home/node/.microsandbox
USER node
CMD ["node", "src/server.js"]
