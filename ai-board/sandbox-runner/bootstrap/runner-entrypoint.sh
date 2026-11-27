#!/bin/sh
# Start as root only to read the gid of /dev/kvm, then drop to user node with that single supplementary group.
set -eu
if [ "$(id -u)" != 0 ]; then exec "$@"; fi
kvm=${RUNNER_KVM_DEVICE:-/dev/kvm}
gid=
[ -e "$kvm" ] && gid=$(stat -c %g "$kvm")
export HOME=/home/node
# gid 0 would hand node the root group; leave it out and let the readiness probe report the missing access.
if [ -n "$gid" ] && [ "$gid" != 0 ]; then
  exec setpriv --reuid=node --regid=node --groups="$gid" --inh-caps=-all --no-new-privs -- "$@"
fi
[ -z "$gid" ] && echo "no $kvm in this container; sandbox readiness will fail" >&2
exec setpriv --reuid=node --regid=node --clear-groups --inh-caps=-all --no-new-privs -- "$@"
