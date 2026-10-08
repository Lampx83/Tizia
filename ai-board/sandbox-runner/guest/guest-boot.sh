#!/bin/sh
# Start the guest's own Docker daemon and wait until it answers. Run once per microVM before Gate 5.
set -eu
if ! docker info >/dev/null 2>&1; then
  (dockerd >/var/log/dockerd.log 2>&1 &)
fi
i=0
until docker info >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 60 ]; then
    tail -30 /var/log/dockerd.log >&2
    echo "dockerd did not start" >&2
    exit 1
  fi
  sleep 1
done
chmod 777 /workspace  # the gate user writes out/ here
echo "dockerd ready"
