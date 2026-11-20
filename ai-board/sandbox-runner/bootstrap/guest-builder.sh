#!/bin/sh
# Build the Gate 5 guest, push it to the registry and write a run-time policy that pins the pushed digest.
# Runs in docker:cli with the repo at $GUEST_SRC; the tracked policy is only read.
# GUEST_BUILD=pinned copies the tracked policy unchanged (keeps its pinned guest, warm cache included).
# $GUEST_WARM_DIR/docker-data.tar.gz, when present, is layered on as the warm Docker cache.
set -eu
src=${GUEST_SRC:-/src}
out=${GUEST_POLICY_OUT:-/out}
warm=${GUEST_WARM_DIR:-/warm}
profile=${RESOURCE_PROFILE:-dev}
push_registry=${GUEST_PUSH_REGISTRY:-localhost:5000}
policy_registry=${GUEST_POLICY_REGISTRY:-image-registry:5000}
policy=$src/ai-board/sandbox-runner/sandbox-policy.$profile.yaml
[ -f "$policy" ] || { echo "no tracked policy for profile $profile" >&2; exit 1; }
mkdir -p "$out"
tmp=$out/.policy.$$
trap 'rm -f "$tmp"' EXIT

if [ "${GUEST_BUILD:-auto}" = pinned ]; then
  tr -d '\r' < "$policy" > "$tmp"
else
  guest=$src/ai-board/sandbox-runner/guest
  base=tizia-gate5-guest:local
  docker build -f "$guest/Dockerfile" -t "$base" "$src"
  if [ -f "$warm/docker-data.tar.gz" ]; then
    ref=$push_registry/gate5:warm
    docker build -f "$guest/Dockerfile.warm" --build-arg BASE="$base" -t "$ref" "$warm"
  else
    ref=$push_registry/gate5:cold
    docker tag "$base" "$ref"
  fi
  push_out=$(docker push "$ref" 2>&1) || { printf '%s\n' "$push_out" >&2; exit 1; }
  digest=$(printf '%s\n' "$push_out" | sed -n 's/.*digest: \(sha256:[0-9a-f]\{64\}\).*/\1/p' | tail -n 1)
  [ -n "$digest" ] || { echo "push did not report a digest" >&2; exit 1; }
  tr -d '\r' < "$policy" | sed "s|^guest_image: .*|guest_image: $policy_registry/gate5@$digest|" > "$tmp"
  grep -q "^guest_image: $policy_registry/gate5@$digest\$" "$tmp" || { echo "policy has no guest_image line" >&2; exit 1; }
  echo "guest pinned: $digest"
fi
mv -f "$tmp" "$out/sandbox-policy.yaml"
