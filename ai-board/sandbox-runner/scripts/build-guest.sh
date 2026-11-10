#!/bin/sh
# Build the Gate 5 guest image, add the warm Docker cache and push it to the local registry.
# Run from the repo root: sh ai-board/sandbox-runner/scripts/build-guest.sh <dir holding docker-data.tar.gz> [registry]
# docker-data.tar.gz comes from scripts/warm-guest.mjs. Prints the guest_image line to review into the sandbox policy.
set -eu
warm_dir=${1:?directory containing docker-data.tar.gz}
registry=${2:-localhost:5000}
docker build -f ai-board/sandbox-runner/guest/Dockerfile -t tizia-gate5-guest:dev .
docker build -f ai-board/sandbox-runner/guest/Dockerfile.warm -t "$registry/gate5:warm" "$warm_dir"
digest=$(docker push "$registry/gate5:warm" | sed -n 's/.*digest: \(sha256:[0-9a-f]*\).*/\1/p' | tail -1)
[ -n "$digest" ] || { echo "push did not report a digest" >&2; exit 1; }
echo "guest_image: image-registry:5000/gate5@$digest"
