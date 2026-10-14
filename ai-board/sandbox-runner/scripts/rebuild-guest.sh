#!/bin/sh
# Rebuild the pinned Gate 5 guest after a change to the harness files it bakes in, then pin it and restart the runner.
# Overlay on the currently pinned image (keeps the warm Docker cache), so no warm tar is needed.
# Run from anywhere: sh ai-board/sandbox-runner/scripts/rebuild-guest.sh [registry]   (the dev stack must be up)
set -eu
root=$(git rev-parse --show-toplevel)
cd "$root"
registry=${1:-localhost:5000}
policy=ai-board/sandbox-runner/sandbox-policy.dev.yaml
inputs=ai-board/sandbox-runner/scripts/guest-inputs.mjs
base=$(tr -d '\r' < "$policy" | sed -n 's/^guest_image: .*@\(sha256:[0-9a-f]*\)$/\1/p')
[ -n "$base" ] || { echo "no pinned guest_image in $policy" >&2; exit 1; }

stage_root="$root/.scratch/ai-board-local-first/guest-staging"
mkdir -p "$stage_root"
stage=$(mktemp -d "$stage_root/stage.XXXXXX")
stage_root=$(cd "$stage_root" && pwd -P)
stage=$(cd "$stage" && pwd -P)
case "$stage" in "$stage_root"/stage.*) ;; *) echo "unsafe guest staging path" >&2; exit 1 ;; esac
trap 'rm -rf "$stage"' EXIT
node "$inputs" stage "$stage"
cat > "$stage/Dockerfile" <<EOF
FROM $registry/gate5@$base
RUN rm -rf /opt/ai-board/ai-board/harness
COPY ai-board/harness /opt/ai-board/ai-board/harness
COPY server/ai-board/guard-lexicon.json /opt/ai-board/server/ai-board/guard-lexicon.json
COPY server/ai-board/contract.json /opt/ai-board/server/ai-board/contract.json
COPY server/ai-board/classifier-calibration.json /opt/ai-board/server/ai-board/classifier-calibration.json
COPY server/ai-board/model-routing.json /opt/ai-board/server/ai-board/model-routing.json
COPY scripts/smoke-user-state.sh /opt/ai-board/scripts/smoke-user-state.sh
COPY ai-board/sandbox-runner/guest/guest-boot.sh /usr/local/bin/guest-boot.sh
RUN chmod +x /usr/local/bin/guest-boot.sh
# Source overlays can change dependencies too; install the reviewed current requirements.
RUN /opt/venv/bin/python -m pip install --no-cache-dir -r /opt/ai-board/ai-board/harness/requirements.txt
# The pages name Inter first; without it Chromium mixes fallback fonts and Vietnamese diacritics look broken in the shots.
RUN ls /usr/share/fonts/opentype/inter > /dev/null 2>&1 || (apt-get update && apt-get install -y --no-install-recommends fonts-inter && fc-cache -f && apt-get clean && find /var/lib/apt/lists -type f -delete)
EOF
docker build -t "$registry/gate5:overlay" "$stage"
digest=$(docker push "$registry/gate5:overlay" | sed -n 's/.*digest: \(sha256:[0-9a-f]*\).*/\1/p' | tail -1)
[ -n "$digest" ] || { echo "push did not report a digest" >&2; exit 1; }
node "$inputs" pin "$policy" "$digest"
docker compose -f docker-compose.dev.yml --profile ai-board up -d --force-recreate sandbox-runner
echo "pinned $digest"
