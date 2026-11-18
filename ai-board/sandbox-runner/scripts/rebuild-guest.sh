#!/bin/sh
# Rebuild the pinned Gate 5 guest after a change to the harness files it bakes in, then pin it.
# Overlay on the currently pinned image (keeps the warm Docker cache), so no warm tar is needed.
# Base with more than GUEST_MAX_LAYERS (default 100) layers, or with a layer over the Microsandbox extract limit, is
# re-layered first: overlays on ~400 layers fail with "mount options is too long", and one layer above 10 GiB fails
# "total extracted size exceeded" at sandbox create. Re-layering needs about 2x the image size free disk.
# Run from anywhere: sh ai-board/sandbox-runner/scripts/rebuild-guest.sh [registry]   (the dev stack must be up)
# RECREATE_RUNNER=1 also recreates sandbox-runner; default only prints the command.
set -eu
root=$(git rev-parse --show-toplevel)
cd "$root"
registry=${1:-localhost:5000}
policy=ai-board/sandbox-runner/sandbox-policy.dev.yaml
inputs=ai-board/sandbox-runner/scripts/guest-inputs.mjs
layers=ai-board/sandbox-runner/scripts/guest-layers.mjs
max_layers=${GUEST_MAX_LAYERS:-100}
base=$(tr -d '\r' < "$policy" | sed -n 's/^guest_image: .*@\(sha256:[0-9a-f]*\)$/\1/p')
[ -n "$base" ] || { echo "no pinned guest_image in $policy" >&2; exit 1; }
base_ref="$registry/gate5@$base"

stage_root="$root/.scratch/ai-board-local-first/guest-staging"
mkdir -p "$stage_root"
stage=$(mktemp -d "$stage_root/stage.XXXXXX")
stage_root=$(cd "$stage_root" && pwd -P)
stage=$(cd "$stage" && pwd -P)
case "$stage" in "$stage_root"/stage.*) ;; *) echo "unsafe guest staging path" >&2; exit 1 ;; esac
trap 'rm -rf "$stage"' EXIT

docker image inspect "$base_ref" > /dev/null 2>&1 || docker pull "$base_ref" > /dev/null
count=$(docker image inspect "$base_ref" | node "$layers" layers)
echo "base $base: $count layers (max $max_layers)"
overlay_base=$base_ref
oversize=$(docker history --human=false --no-trunc --format '{{.Size}}' "$base_ref" | node "$layers" oversize || true)
if node "$layers" flatten "$count" "$max_layers" || [ -n "$oversize" ]; then
  echo "re-layering base under the extract limits; needs about 2x the image size free disk" >&2
  docker image inspect "$base_ref" | node "$layers" changes > "$stage/changes.txt"
  docker run --rm --entrypoint sh "$base_ref" -c 'du -abx / 2>/dev/null' > "$stage/du.txt"
  docker run --rm --entrypoint sh "$base_ref" -c 'find / -xdev -type l 2>/dev/null' > "$stage/symlinks.txt"
  top=$(docker run --rm --entrypoint ls "$base_ref" -A /)
  # shellcheck disable=SC2086 # one top-level name per word
  node "$layers" plan "$stage/symlinks.txt" $top < "$stage/du.txt" > "$stage/plan.json"
  node "$layers" split-dirs "$stage/plan.json" > "$stage/split-dirs.txt"
  docker run --rm -v "$stage:/stage:ro" --entrypoint sh "$base_ref" -c 'xargs -d "\n" stat -c "%a %u %g %n" < /stage/split-dirs.txt' > "$stage/modes.txt"
  mkdir "$stage/relayer"
  node "$layers" dockerfile "$base_ref" "$stage/plan.json" "$stage/modes.txt" "$stage/changes.txt" > "$stage/relayer/Dockerfile"
  docker build -q -t "$registry/gate5:flat" "$stage/relayer" > /dev/null
  flat=$(docker push "$registry/gate5:flat" | sed -n 's/.*digest: \(sha256:[0-9a-f]*\).*/\1/p' | tail -1)
  [ -n "$flat" ] || { echo "flat push did not report a digest" >&2; exit 1; }
  flat_count=$(docker image inspect "$registry/gate5@$flat" | node "$layers" layers)
  echo "re-layered: $count -> $flat_count layers, digest $flat"
  flat_tag=$(node "$layers" tag "$flat")
  docker tag "$registry/gate5:flat" "$registry/gate5:$flat_tag"
  docker push "$registry/gate5:$flat_tag" > /dev/null
  overlay_base="$registry/gate5@$flat"
fi

node "$inputs" stage "$stage"
cat > "$stage/Dockerfile" <<EOF
FROM $overlay_base
RUN rm -rf /opt/ai-board/ai-board/harness
COPY ai-board/harness /opt/ai-board/ai-board/harness
COPY server/ai-board/guard-lexicon.json /opt/ai-board/server/ai-board/guard-lexicon.json
COPY server/ai-board/contract.json /opt/ai-board/server/ai-board/contract.json
COPY server/ai-board/classifier-calibration.json /opt/ai-board/server/ai-board/classifier-calibration.json
COPY server/ai-board/model-routing.json /opt/ai-board/server/ai-board/model-routing.json
COPY server/ai-board/redaction-patterns.json /opt/ai-board/server/ai-board/redaction-patterns.json
COPY scripts/smoke-user-state.sh /opt/ai-board/scripts/smoke-user-state.sh
COPY ai-board/sandbox-runner/guest/guest-boot.sh /usr/local/bin/guest-boot.sh
RUN chmod +x /usr/local/bin/guest-boot.sh
# Source overlays can change dependencies too; install the reviewed current requirements.
RUN /opt/venv/bin/python -m pip install --no-cache-dir -r /opt/ai-board/ai-board/harness/requirements.txt
# The pages name Inter first; without it Chromium mixes fallback fonts and Vietnamese diacritics look broken in the shots.
RUN ls /usr/share/fonts/opentype/inter > /dev/null 2>&1 || (apt-get update && apt-get install -y --no-install-recommends fonts-inter && fc-cache -f && apt-get clean && find /var/lib/apt/lists -type f -delete)
EOF
docker build -t "$registry/gate5:overlay" "$stage"
# A harness file read at import that the overlay did not copy crashes every Gate 5 run in the guest.
docker run --rm --entrypoint sh "$registry/gate5:overlay" -c 'cd /opt/ai-board/ai-board/harness && python -c "import gates.gate5_guest"' \
  || { echo "guest harness does not import; add the missing file to guest-inputs.mjs and this overlay" >&2; exit 1; }
# A plain docker run accepts layers that Microsandbox refuses at create; never pin one.
if over=$(docker history --human=false --no-trunc --format '{{.Size}}' "$registry/gate5:overlay" | node "$layers" oversize); then
  echo "guest has a layer over the Microsandbox extract limit ($over bytes); not pinning" >&2; exit 1
fi
digest=$(docker push "$registry/gate5:overlay" | sed -n 's/.*digest: \(sha256:[0-9a-f]*\).*/\1/p' | tail -1)
[ -n "$digest" ] || { echo "push did not report a digest" >&2; exit 1; }
node "$inputs" pin "$policy" "$digest"

pin_tag=$(node "$layers" tag "$digest")
docker tag "$registry/gate5:overlay" "$registry/gate5:$pin_tag"
docker push "$registry/gate5:$pin_tag" > /dev/null
echo "pinned $digest (tag $pin_tag)"

overlays=""
for f in ${AI_BOARD_COMPOSE_OVERLAYS:-}; do overlays="$overlays -f $f"; done
echo "runner recreate (only sandbox-runner; run with the same host env the bootstrap wrote):"
echo "  COMPOSE_PROJECT_NAME=tizia-local docker compose --env-file ai-board-host.env -f docker-compose.dev.local.yml$overlays --profile ai-board up -d --force-recreate --no-deps sandbox-runner"
if [ "${RECREATE_RUNNER:-0}" = 1 ]; then
  COMPOSE_PROJECT_NAME=tizia-local docker compose --env-file ai-board-host.env -f docker-compose.dev.local.yml $overlays --profile ai-board up -d --force-recreate --no-deps sandbox-runner
fi
