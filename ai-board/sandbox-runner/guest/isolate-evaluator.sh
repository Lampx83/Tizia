#!/bin/sh
# Candidate code must not read the trusted evaluator, including cached bytecode.
set -eu
root=/opt/ai-board/ai-board/harness
find "$root" -type f \( -name 'eval_*' -o -name 'conftest.*' \) -exec chmod 600 {} +
for name in evaluation eval tests; do
  if [ -d "$root/$name" ]; then
    chmod -R go-rwx "$root/$name"
  fi
done
