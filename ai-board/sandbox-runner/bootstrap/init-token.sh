#!/bin/sh
# Create the shared runner token once; keep an existing valid one. Output: $TOKEN_DIR/$TOKEN_NAME, 64 hex chars, mode 644.
set -eu
dir=${TOKEN_DIR:-/token}
name=${TOKEN_NAME:-sandbox-runner-token}
file=$dir/$name
mkdir -p "$dir"
if [ -f "$file" ] && [ "$(tr -d '\r\n' < "$file" | wc -c)" -ge 32 ]; then
  echo "runner token present"
  exit 0
fi
umask 022
tmp=$dir/.$name.$$
head -c 32 /dev/urandom | od -An -v -tx1 | tr -d ' \n' > "$tmp"
chmod 644 "$tmp"
mv -f "$tmp" "$file"
echo "runner token created"
